FROM node as build-stage

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:production

FROM nginx as production-stage

RUN mkdir -p /var/www/front

COPY --from=build-stage /dist /var/www/front