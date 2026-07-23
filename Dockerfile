FROM node:alpine

WORKDIR /usr/src/app

RUN export PORT=3000 && npm install -g serve

COPY . .

ENV PORT=3000

CMD ["serve", "-l", "3000", "."]