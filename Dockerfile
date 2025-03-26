FROM node:20-alpine as build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile
COPY . .
RUN chmod +x node_modules/.bin/webpack
RUN cp -r build /app/build
RUN npm run build:prod

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]