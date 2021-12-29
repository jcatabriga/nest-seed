FROM node:16 AS builder
ENV NODE_ENV build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
COPY . .

# Install app dependencies
RUN yarn install --frozen-file

COPY . .

RUN yarn build

FROM node:16
ENV NODE_ENV production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]