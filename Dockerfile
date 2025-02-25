FROM node:20-alpine as build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build:prod

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]