const fs = require("fs")

const typeFile = fs.readFileSync("./apps/server/src/graphql.ts");
fs.writeFileSync("./apps/client/src/lib/types/GraphqlSchema.ts", typeFile);

console.log("Success")