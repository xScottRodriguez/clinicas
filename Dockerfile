FROM node:lts-bullseye AS builder
# max old space size for build
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app
COPY package*.json .
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf    
COPY --from=builder /app/build /var/www/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]








