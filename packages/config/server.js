const express = require('express');
const crypto = require('crypto');
const { config } = require("dotenv")
const { generateNginxConfFile, dockerComposeCustomize, removeNginxFile } = require("./utils");
const { spawn } = require('child_process');
const { addDNSRecord } = require("./cloudflare")
config()

const app = express();
const port = 4040;

app.use(express.json());

let isProcessing = false;
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  const event = req.headers["x-github-event"]
  const secret = process.env.SECRET;

  const expectedSignature = `sha256=${crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')}`;

  console.log(expectedSignature)
  console.log(signature)
  if (signature === expectedSignature) {
    // Signature is valid, process the webhook payload
    processPayload(req.body, event);
    res.status(200).send('Webhook received successfully.');
  } else {
    // Signature is invalid, reject the webhook request
    res.status(401).send('Invalid signature.');
  }
});

async function processPayload(payload, event) {
  if (!payload.ref || payload.ref_type !== "branch" || !event) return;
  if (!payload.ref === "main") return;

  switch (event) {
    case "create":
      generateNginxConfFile(payload.ref);
      dockerComposeCustomize(payload.ref);
      await addDNSRecord(payload.ref);
      break;
    case "delete":
      removeNginxFile(payload.ref);
      dockerComposeCustomize(payload.ref);
  }

  if (isProcessing) return isProcessing;
  isProcessing = true;
  console.log("Job started");
  const dockerPull = spawn("docker", ["compose", "pull"], { stdio: 'inherit' });
  dockerPull.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    const dockerBuildWithStart = spawn("docker", ["compose", "up", "--build", "-d"], { stdio: "inherit" })
    dockerBuildWithStart.on("close", () => {
      isProcessing = false;
      console.log("Finished all jobs")
    })
  })

}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});