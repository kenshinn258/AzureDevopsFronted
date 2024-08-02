FROM node:18.12.1-alpine  as build-stage

WORKDIR /app
ADD ./src ./src
COPY package*.json ./
COPY ./public ./public
COPY *.js  ./
COPY *.env.*  ./
COPY index.html   ./
COPY .eslin*   ./

RUN npm install && \
    npm run build:sit 
 

FROM nginx:1.25.1 as production-stage 
# FROM nginx:stable-alpine as production-stage
# FROM goharbor/nginx-photon:v2.8.2 as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]