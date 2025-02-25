FROM node:20-alpine as build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile
COPY . .
RUN chmod +x node_modules/.bin/webpack
RUN npm run build:prod

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]