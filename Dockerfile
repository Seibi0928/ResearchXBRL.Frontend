FROM node:12.22.7-stretch as build-stage

ENV NODE_ENV="production"

WORKDIR /src

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:production

FROM nginx:1.21.4 as production-stage

COPY --from=build-stage /src/dist /usr/share/nginx/html/dist
COPY --from=build-stage /src/index.html /usr/share/nginx/html