FROM node:9
COPY package.json /app
COPY . /app
WORKDIR /app
CMD ls -ltr && npm install && npm start
