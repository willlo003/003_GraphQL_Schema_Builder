# Start FROM a baseline image of node v10.1
FROM node:10

# Set up a WORKDIR for application in the container and set it to `/usr/src/app`.
WORKDIR /usr/src/app

# COPY all of your application files to the WORKDIR in the container
COPY . /usr/src/app

# RUN a command to npm install your node_modules in the container
RUN npm install 

# RUN a command to build your application in the container
RUN npm run build

# EXPOSE your server port (3000)
EXPOSE 3000

# Create an [ENTRYPOINT](https://www.devopsnipp.com/forum/devops-tools/docker-entrypoint-cmd-dockerfile-best-practices) where you'll run `node ./server/server.js`
# ENTRYPOINT ["node", "./src/server/server.ts"]

CMD ["npm", "run", "start"]
