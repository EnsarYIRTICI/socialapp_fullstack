FROM node:22.5-alpine

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY ./src/config/db-docker.ts ./src/config/db.ts
COPY ./ ./

CMD ["npm", "start"]