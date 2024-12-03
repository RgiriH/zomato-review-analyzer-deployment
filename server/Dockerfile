FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV API_KEY=AIzaSyALLaUylEUoTfzGJYd3IYjoffGJO_3I2yk
ENV CORS=http://localhost:3000
ENV PORT_NUMBER=8000

EXPOSE 8000

CMD [ "node" , "server.js" ]