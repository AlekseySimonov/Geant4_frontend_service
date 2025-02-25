FROM node:20-alpine as build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile
COPY . .
RUN chmod +x node_modules/.bin/webpack
RUN npm run build:prod

FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "8000"]