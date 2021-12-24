FROM node:16
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install --frozen-file

COPY . .

RUN yarn build

EXPOSE 8080

RUN yarn start:prod