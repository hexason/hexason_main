const YAML = require("yaml")
const fs = require("fs")
const { config } = require("dotenv")
const sanitize = require("sanitize-filename")

config(".env")
const generateNginxConfFile = (branchName) => {
  // server_name ${branchName}.dev.${process.env.DOMAIN_SERVER};
  branchName = sanitize(branchName);
  const nginxConf = `server {
    listen 80;
    server_name ${branchName}.${process.env.DOMAIN_SERVER};

    location / {
        proxy_pass http://${branchName}:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    location /api/ {
        proxy_pass http://${branchName}:4000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`

  fs.writeFileSync(`./nginx/${branchName}.${process.env.DOMAIN_SERVER}.conf`, nginxConf)
}

const removeNginxFile = (branchName) => {
  branchName = sanitize(branchName);
  if (fs.existsSync(`./nginx/${branchName}.${process.env.DOMAIN_SERVER}.conf`)) fs.unlinkSync(`./nginx/${branchName}.${process.env.DOMAIN_SERVER}.conf`)
}

const dockerComposeCustomize = (branchName) => {
  branchName = sanitize(branchName);
  const dockerCompose = `version: '3'
  services:
    nginx:
      image: nginx:latest
      ports:
        - 80:80
      volumes:
        - ./nginx:/etc/nginx/conf.d
  
  networks:
    default:
      driver: bridge
  
    `
  if (!fs.existsSync("./docker-compose.yml")) fs.writeFileSync("docker-compose.yml", dockerCompose);
  const file = fs.readFileSync('./docker-compose.yml', 'utf8');
  const doc = YAML.parseDocument(file).toJS();
  doc.services[branchName] = {
    image: `ghcr.io/hexason/hexason_main:${branchName}`,
    env_file: ['.env.local'],
  }
  fs.writeFileSync("docker-compose.yml", String(new YAML.Document(doc)))
}

const removeServiceFromDockerCompose = (branchName) => {
  branchName = sanitize(branchName);
  if (!fs.existsSync("./docker-compose.yml")) return;
  const file = fs.readFileSync('./docker-compose.yml', 'utf8');
  const doc = YAML.parseDocument(file).toJS();
  delete doc.services[branchName]
  fs.writeFileSync("docker-compose.yml", String(new YAML.Document(doc)))
}


module.exports = {
  dockerComposeCustomize,
  generateNginxConfFile,
  removeServiceFromDockerCompose,
  removeNginxFile
}

