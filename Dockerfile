FROM node:lts-buster-slim

ENV NODE_ENV="development"

WORKDIR /listbot

COPY package*.json ./

COPY CHANGELOG ./

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY ./src . 

EXPOSE 3000

CMD nodemon -L --watch . index.js