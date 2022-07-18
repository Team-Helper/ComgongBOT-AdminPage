FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8080
CMD [ "yarn", "serve" ]