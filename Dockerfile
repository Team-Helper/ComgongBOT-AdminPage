FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn
RUN yarn global add @vue/cli
COPY . .
EXPOSE 8080
CMD [ "yarn", "serve" ]