const YAML = require("yaml")
const fs = require("fs")
const { config } = require("dotenv")
const { exec } = require("child_process")

config(".env")
const generateNginxConfFile = (branchName) => {
  const nginxConf = `server {
    listen 80;
    server_name ${branchName}.dev.${process.env.DOMAIN_SERVER};

    location / {
        proxy_pass http://${branchName}:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`

  fs.writeFileSync(`./nginx/${branchName}.${process.env.DOMAIN_SERVER}.conf`, nginxConf)
}

const dockerComposeCustomize = (branchName) => {
  const dockerCompose = `version: '3'
  services:
  nginx:
  image: nginx:latest
  ports:
  - 80:80
  volumes:
      - ./nginx:/etc/nginx/conf.d
    `
  if (!fs.existsSync("./docker-compose.yml")) fs.writeFileSync("docker-compose.yml", dockerCompose);
  const file = fs.readFileSync('./docker-compose.yml', 'utf8');
  const doc = YAML.parseDocument(file).toJS();
  doc.services[branchName] = { image: 'nikorunikk/hexason-server', env_file: ['.env.local'] }
  fs.writeFileSync("docker-compose.yml", String(new YAML.Document(doc)))
}

exec("git branch --show-current", (err, data) => {
  if (err) return;
  dockerComposeCustomize(data.replace("\n", "").replace(/\s/i, ""));
  generateNginxConfFile(data.replace("\n", "").replace(/\s/i, ""));
})

