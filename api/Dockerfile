FROM node:14-alpine

RUN mkdir -p /src/app

RUN mkdir /src/db

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN npx knex migrate:latest

RUN npx knex seed:run 

EXPOSE 3001

CMD [ "npm", "start" ]