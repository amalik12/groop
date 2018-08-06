FROM node:latest

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
COPY ./app/build ./build
EXPOSE $PORT
CMD npm start