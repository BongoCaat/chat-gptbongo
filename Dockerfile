FROM node:16-alpine AS build

RUN addgroup -S app && adduser -S app -G app
RUN mkdir /app && chown app:app /app

USER app

WORKDIR /app

COPY ./app/package.json ./
COPY ./app/tsconfig.json ./

RUN npm install

COPY ./app/craco.config.js ./craco.config.js
COPY ./app/public ./public
COPY ./app/src ./src

ENV NODE_ENV=production
ENV REACT_APP_AUTH_PROVIDER=local

RUN npm run build

FROM node:16-alpine AS server

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY ./server/package.json ./
COPY ./server/tsconfig.json ./

RUN npm install

COPY ./server/src ./src

COPY --from=build /app/build /app/public