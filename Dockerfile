# Install dependencies only when needed
# Stage 0
FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN yarn install
#############################################


# Rebuild the source code only when needed
# Stage 1
FROM node:18-alpine AS builder
WORKDIR /app

COPY . .

RUN yarn build 
#############################################


# Production image, copy only production files
# Stage 2
FROM nginx:alpine AS prod

WORKDIR /usr/share/nginx/html

RUN rm -rf ./* && apk add nano

COPY --from=builder /app/dist .
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

WORKDIR /etc/nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]
#############################################
