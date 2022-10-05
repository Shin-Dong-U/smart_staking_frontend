FROM node:16.16.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -y

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start"]