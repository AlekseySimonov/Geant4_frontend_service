FROM node:20-alpine AS builder
WORKDIR /app

# Копируем файлы зависимостей и устанавливаем их
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем приложение (build-артефакты будут помещены в /app/build)
RUN npm run build:prod

# Этап раздачи статических файлов через Nginx
FROM nginx:stable-alpine

# Копируем кастомный конфиг nginx (если требуется)
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/ssl /etc/nginx/ssl

# Копируем файлы сборки из этапа builder
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]