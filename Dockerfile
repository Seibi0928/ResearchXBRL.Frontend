FROM node as build-stage

ADD ./package*.json ./
RUN npm install
COPY . .
RUN npm run build:production

FROM nginx as production-stage

RUN mkdir -p /var/www/front

COPY --from=build-stage /dist /var/www/front