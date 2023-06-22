const addDNSRecord = async (branchName) => {
  await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.ZONE_ID}/dns_records`, {
    method: "post",
    headers: {
      authorization: "Bearer " + process.env.CLOUDFLARE_TOKEN,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "content": process.env.IP_ADDRESS,
      "name": branchName + "-dev",
      "type": "A",
      "proxied": true
    })
  }).then(res => res.json()).then(console.log)
}

module.exports = { addDNSRecord }