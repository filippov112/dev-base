#example #tool-docker

---
Для запуска PostgreSQL в Docker так, чтобы он был доступен для подключения через DBeaver, но при этом не конфликтовал с уже установленной на хосте базой, нужно указать нестандартный порт для контейнера. Например, можно использовать 5433.

### Шаги:
1. **Создать `docker-compose.yml`** с таким содержимым:
	```yaml
	version: '3.8'
	
	services:
	  postgres:
	    image: postgres:latest
	    container_name: my_postgres
	    restart: always
	    environment:
	      POSTGRES_USER: user
	      POSTGRES_PASSWORD: password
	      POSTGRES_DB: mydatabase
	    ports:
	      - "5433:5432"
	    volumes:
	      - pgdata:/var/lib/postgresql/data
	
	volumes:
	  pgdata:
	```

1. **Запустить контейнер**:

	```sh
	docker-compose up -d
	```

1. **Подключиться через DBeaver**, указав:
    - **Хост**: `localhost`
    - **Порт**: `5433`
    - **База данных**: `mydatabase`
    - **Пользователь**: `user`
    - **Пароль**: `password`

Если в DBeaver указан порт по умолчанию (5432), его нужно изменить на 5433 в настройках подключения.

### Outer links:

