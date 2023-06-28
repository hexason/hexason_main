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
  let branch = (payload.ref || "").replace("refs/heads/", "")
  if (event === "package") branch = payload.package.package_version.container_metadata.tag.name
  if (branch === "main") return;
  if (branch !== "dev") return;
  if (typeof branch !== "string" || !branch || !event) return;

  switch (event) {
    case "package":
      generateNginxConfFile(branch);
      dockerComposeCustomize(branch);
      await addDNSRecord(branch);
      break;
    case "create":
      generateNginxConfFile(branch);
      dockerComposeCustomize(branch);
      await addDNSRecord(branch);
      break;
    case "delete":
      removeNginxFile(branch);
      dockerComposeCustomize(branch);
  }


  if (isProcessing) return isProcessing;
  isProcessing = true;
  console.log("Job started");
  const dockerPull = spawn("docker", ["compose", "pull"], { stdio: 'inherit' });
  dockerPull.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    const dockerBuildWithStart = spawn("docker", ["compose", "up", "--build", "--force-recreate", "-d"], { stdio: "inherit" })
    dockerBuildWithStart.on("close", () => {
      const dockerCleanUnusedImage = spawn("docker", ["system", "prune", "-a", "-f"], { stdio: "inherit" })
      dockerCleanUnusedImage.on("close", () => {
        isProcessing = false;
        console.log("Finished all jobs")
      })
    })
  })

}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
