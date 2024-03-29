# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

RUN npm install -g serve

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
COPY etc ./etc

# Build for production.
CMD npm run build && serve -s build
