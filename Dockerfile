FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn && yarn global add @vue/cli
COPY . .
EXPOSE 8080
CMD [ "yarn", "serve" ]