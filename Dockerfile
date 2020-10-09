FROM node:lts-buster-slim

WORKDIR /listbot

COPY package*.json ./

RUN npm install --quiet

COPY . .

EXPOSE 3000

CMD npm run dev