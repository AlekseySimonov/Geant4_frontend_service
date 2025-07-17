# Geant4ru frontend service

## Описание
В данном репозитории содержатся исходные коды пользовательского интерфейса сайта Geant4ru.

## Стэк технологий

[![TypeScript][shields-typescript-domain]](https://www.typescriptlang.org/) 
[![React][shields-react-domain]](https://react.dev/) 
[![Material UI][shields-materialui-domain]](https://mui.com/) 
[![React Router][shields-react-router-domain]](https://reactrouter.com/)
[![Redux Toolkit][shields-redux-domain]](https://redux-toolkit.js.org/) 
[![Feature-Sliced Design][shields-fsd-domain]](https://feature-sliced.design/) </br>
[![Axios][shields-axios-domain]](https://axios-http.com/)
[![Webpack][shields-webpack-domain]](https://webpack.js.org/) 
[![Sass][shields-sass-domain]](https://sass-lang.com/) 

[shields-typescript-domain]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[shields-sass-domain]: https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white
[shields-materialui-domain]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[shields-react-router-domain]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[shields-axios-domain]: https://img.shields.io/badge/axios-5A29E4?style=flat&logo=axios&logoColor=white
[shields-fsd-domain]: https://img.shields.io/badge/Feature--Sliced-Design?style=for-the-badge&color=F2F2F2&labelColor=262224&logoWidth=10&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABISURBVHgB7dKxCQAgDETR0w2cws0cys2cwhEUBbsggikCuVekDHwSQFlYo7Q+8KnmtHdFWMdk2cl5wSsbxGSZw8dm8pX9ZHUTMBUgGU2F718AAAAASUVORK5CYII=
[shields-webpack-domain]: https://img.shields.io/badge/-Webpack-8DD6F9?style=flat&logo=webpack&logoColor=white
[shields-react-domain]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[shields-redux-domain]: https://img.shields.io/badge/redux_toolkit-%2320232a.svg?style=for-the-badge&logo=redux&logoColor=%764abc

## Запуск в режиме разработки

Клонировать репозиторий 
```bash
git clone https://github.com/AlekseySimonov/Geant4_frontend_service.git
```
Для установки всех зависимостей из package.json
```bash
npm install
```
Для запуска webpack-dev-server
```bash
npm run start
```
Для запуска тестов
```bash
npm run test
```

Проект использует переменные окружения. Их необходимо указать в `.env`

```bash
API_BASE_URL=https://geant4-dev-frontend.tsu.ru:444/api/v1
FRONT_BASE_URL=https://geant4-dev-frontend.tsu.ru
```

## Сборка

### Dev-сборка
Используется для отладки. Включает source maps и отключает минификацию.

```bash
npm run build:dev
```
### Production-сборка
Создаёт финальную оптимизированную версию приложения для деплоя. Включает минификацию, tree-shaking и удаление dev-зависимостей.
```bash
npm run build:prod
```
### Папка сборки 
Результат обеих сборок сохраняется в директорию `build`.

## Деплой
CI/CD настроен с помощью GitHub Actions. Скрипты находятся в директории `.github/workflows/`.
При пуше в ветку `master` автоматически выполняется

- Создание sitemap
- Установка зависимостей
- Проверка прохождения всех тестов
- Сборка приложения
- Подготовка Docker-образа
- Развёртывание с помощью Nginx

## TODO: Необходимые улучшения  

- Сократить время развёртывания приложения для ускорения доставки новых изменений
- Улучшить скорость проявления графиков, адаптировать верстку под мобильные устройства, а также повысить удобство взаимодействия пользователей с интерактивными элементами графиков
- Оптимизировать структуру страниц, мета-теги и sitemap для повышения видимости сайта в поисковых системах
- Использовать современные форматы изображений (WebP, AVIF), lazy loading и CDN для сокращения времени загрузки
- Обеспечить информативные и удобные для пользователя страницы и сообщения об ошибках, а также продумать обработку соответствующих сценариев на клиенте
- Повысить стабильность приложения за счет расширения модульных и интеграционных тестов на основные функциональные блоки
- Разделить стадии CI и CD. Сейчас деплой зависит только от успешного прохождения тестов.

## Потенциальные точки роста

- Внедрить отдельные проверки качества (ESLint, Stylelint и т.д.)
- Реализовать экспорт графиков с сохранением всех пояснительных элементов
- Внедрить систему мониторинга логов для эффективного отслеживания и анализа ошибок фронтенда (Данная система реализована на Backend)
- Провести рефакторинг архитектуры, использовать переиспользуемые компоненты и хуки для уменьшения избыточности
- Добавить Server-Side Rendering (SSR)




