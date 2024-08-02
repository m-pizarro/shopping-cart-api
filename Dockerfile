FROM node:18-alpine3.16

WORKDIR /app

COPY  package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 4004

CMD ["yarn", "dev"]