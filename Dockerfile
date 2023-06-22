# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied

COPY . .
# Install app dependencies
RUN npm i -g pnpm
RUN pnpm install

RUN pnpm build

# Start the server using the production build
CMD [ "pnpm", "start" ]