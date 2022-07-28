# STAGE 1: build
FROM node:16.16.0-alpine3.15 AS build
WORKDIR "/app"
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: run
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/maya-academy-frontend /usr/share/nginx/html