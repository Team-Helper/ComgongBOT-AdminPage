FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn && yarn global add @vue/cli
COPY . .
EXPOSE 8080
CMD [ "yarn", "serve" ]