# Install dependencies only when needed
# Stage 0
FROM node:16-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN yarn install --frozen-lockfile
#############################################


# Rebuild the source code only when needed
# Stage 1
FROM node:16-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build 
#############################################


# Production image, copy only production files
# Stage 2
FROM nginx AS prod

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
#############################################