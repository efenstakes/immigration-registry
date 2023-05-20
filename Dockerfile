# base image for server
FROM node:16-alpine

# working directory where server will be
WORKDIR /ImmigrationRegistry

# copy package.json files to install dependencies
COPY package*.json ./

# install dependencies
RUN yarn install 

# copy server code to the container working directory
COPY . .

# build
RUN yarn build

# expose port the server runs on
EXPOSE 8080

# start the server
CMD [ "yarn", "start" ]
