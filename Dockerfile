FROM node:lts-alpine3.15 as builder
WORKDIR /app

COPY package.json /app/
RUN npm i

COPY . /app/
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/venko-ui .
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
