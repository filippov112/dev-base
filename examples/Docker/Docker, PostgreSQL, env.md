#example

### 1. Создайте `.env` файл
Создайте файл `.env` в корне вашего проекта и добавьте туда необходимые переменные:

```env
POSTGRES_DB=lawfirm
POSTGRES_USER=admin
POSTGRES_PASSWORD=ei539EEg8
```

### 2. Измените Dockerfile
В Dockerfile вы можете использовать переменные окружения, которые будут переданы при запуске контейнера. Например:

```Dockerfile
# Используем официальный образ PostgreSQL
FROM postgres:latest

# Определяем ARG для передачи переменных на этапе сборки
#ARG POSTGRES_DB
#ARG POSTGRES_USER
#ARG POSTGRES_PASSWORD

# Используем ARG для установки ENV переменных
#ENV POSTGRES_DB=${POSTGRES_DB}
#ENV POSTGRES_USER=${POSTGRES_USER}
#ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# Открываем порт 5432
EXPOSE 5432
```

### 3. Используйте `docker-compose.yml`
Для удобства управления контейнерами и автоматического чтения `.env` файла, используйте `docker-compose.yml`. Docker Compose автоматически подтягивает переменные из `.env` файла, если он находится в той же директории.

Пример `docker-compose.yml`:

```yaml
version: '3.8'

services:
  db:
    build: .
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 4. Запустите контейнер с Docker Compose
Теперь вы можете запустить контейнер с помощью Docker Compose, и он автоматически подтянет переменные из `.env` файла:

```bash
docker-compose up --build
```

### Как это работает:
- Docker Compose автоматически читает переменные из `.env` файла, если он находится в той же директории.
- Переменные из `.env` передаются в контейнер через `environment` в `docker-compose.yml`.
- В Dockerfile переменные окружения используются через `${VARIABLE_NAME}`.

### Примечание:
Если вы не используете Docker Compose, а хотите передать переменные вручную при запуске контейнера, вы можете сделать это так:

```bash
docker run -d --name postgre -e POSTGRES_DB=lawfirm -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=ei539EEg8 -p 5432:5432 postgre
```

Но использование `.env` и Docker Compose значительно упрощает управление переменными окружения.