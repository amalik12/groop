FROM node:latest

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./app/build ./build
COPY . .
RUN rm -rf /usr/src/app/app
EXPOSE $PORT
CMD npm start