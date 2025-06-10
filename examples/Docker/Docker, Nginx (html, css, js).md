#example
# Деплой сайта в Docker

Создать `Dockerfile` для раздачи статических файлов можно с использованием `nginx` или `Caddy`. Если нужен минималистичный вариант, `nginx` подойдет лучше.

### Пример `Dockerfile`:

```dockerfile
# Использовать официальный образ nginx
FROM nginx:alpine

# Копировать файлы сайта в каталог, который обслуживает nginx
COPY web_client /usr/share/nginx/html

# Контейнер будет слушать 80 порт
EXPOSE 80

# Запустить nginx в режиме демона
CMD ["nginx", "-g", "daemon off;"]
```

### Запуск:

```sh
docker build -t my-web-client .
docker run -d -p 8080:80 my-web-client
```

После этого сайт будет доступен по адресу `http://localhost:8080`.