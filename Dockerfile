FROM node:16.13-alpine3.12

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 1337

CMD yarn dev