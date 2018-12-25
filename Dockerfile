FROM node:latest

# Image has "node" user, so use it
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

# First npm install to save time rebuilding
COPY package*.json ./
RUN npm install

# Copy the app content
COPY . .

# Copy local permissions remapped to node user
COPY --chown=node:node . .

# Switch to node user
USER node

# Configuration
VOLUME /home/node/app/config.yaml

# Run the app
CMD [ "npm", "start" ]