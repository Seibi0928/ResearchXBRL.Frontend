FROM node as build-stage

ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /src

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:production

FROM nginx as production-stage

RUN mkdir -p /var/www/front

COPY --from=build-stage /src/dist /var/www/front