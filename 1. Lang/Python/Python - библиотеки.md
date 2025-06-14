 #lang #lang-python 
 
---
### **1. Веб-фреймворки (основные)**
- **[Django](https://www.djangoproject.com/)** – высокоуровневый фреймворк для быстрой разработки (ORM, админка, аутентификация).  
- **[Django REST Framework (DRF)](https://www.django-rest-framework.org/)** – фреймворк для создания RESTful API на Django.  
- **[FastAPI](https://fastapi.tiangolo.com/)** – современный асинхронный фреймворк для API (на основе Pydantic и Starlette).  
- **[Flask](https://flask.palletsprojects.com/)** – микрофреймворк для гибкой разработки.  
- **[Starlette](https://www.starlette.io/)** – асинхронный фреймворк (основа FastAPI).  
- **[Sanic](https://sanicframework.org/)** – асинхронный фреймворк для высоконагруженных приложений.  

### **2. Работа с базами данных и ORM**
- **[SQLAlchemy](https://www.sqlalchemy.org/)** – мощная ORM и инструменты для работы с SQL.  
- **[Alembic](https://alembic.sqlalchemy.org/)** – система миграций для SQLAlchemy.  
- **[Django ORM](https://docs.djangoproject.com/en/stable/topics/db/)** – встроенная ORM Django.  
- **[Psycopg2](https://www.psycopg.org/)** – драйвер PostgreSQL для Python.  
- **[AsyncPG](https://github.com/MagicStack/asyncpg)** – асинхронный драйвер PostgreSQL.  
- **[Redis-py](https://github.com/redis/redis-py)** – клиент Redis.  
- **[Motor](https://motor.readthedocs.io/)** – асинхронный драйвер MongoDB.  

### **3. Асинхронность и задачи в фоне**
- **[Celery](https://docs.celeryq.dev/)** – распределённая очередь задач (для фоновых процессов).  
- **[RQ (Redis Queue)](https://python-rq.org/)** – простая альтернатива Celery на Redis.  
- **[Asyncio](https://docs.python.org/3/library/asyncio.html)** – стандартная библиотека для асинхронного программирования.  

### **4. Валидация и сериализация данных**
- **[Pydantic](https://pydantic-docs.helpmanual.io/)** – валидация и парсинг данных (используется в FastAPI).  
- **[Marshmallow](https://marshmallow.readthedocs.io/)** – сериализация и десериализация объектов.  

### **5. Аутентификация и авторизация**
- **[Authlib](https://authlib.org/)** – OAuth и JWT (альтернатива для Flask/Django).  
- **[Django-allauth](https://www.intenct.nl/projects/django-allauth/)** – аутентификация в Django (соц. сети, OAuth).  
- **[PyJWT](https://pyjwt.readthedocs.io/)** – работа с JWT-токенами.  
- **[Passlib](https://passlib.readthedocs.io/)** – хеширование паролей.  

### **6. Тестирование**
- **[Pytest](https://docs.pytest.org/)** – фреймворк для тестирования.  
- **[Unittest](https://docs.python.org/3/library/unittest.html)** – стандартный модуль для тестов.  
- **[Factory Boy](https://factoryboy.readthedocs.io/)** – создание тестовых данных.  
- **[HTTPX](https://www.python-httpx.org/)** – HTTP-клиент для тестирования API (асинхронный аналог `requests`).  

### **7. Деплой и инфраструктура**
- **[Gunicorn](https://gunicorn.org/)** – WSGI-сервер для запуска Django/Flask.  
- **[Uvicorn](https://www.uvicorn.org/)** – ASGI-сервер для FastAPI/Starlette.  
- **[Docker SDK](https://docker-py.readthedocs.io/)** – работа с Docker из Python.  
- **[Kubernetes Client (k8s)](https://github.com/kubernetes-client/python)** – управление Kubernetes.  

### **8. Логирование и мониторинг**
- **[Loguru](https://github.com/Delgan/loguru)** – удобное логирование.  
- **[Sentry SDK](https://docs.sentry.io/platforms/python/)** – мониторинг ошибок.  
- **[Prometheus Client](https://github.com/prometheus/client_python)** – метрики для мониторинга.  

### **9. Дополнительные полезные библиотеки**
- **[Click](https://click.palletsprojects.com/)** – создание CLI-утилит.  
- **[Faker](https://faker.readthedocs.io/)** – генерация фейковых данных.  
- **[Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)** – работа с AWS.  
- **[Stripe](https://stripe.com/docs/api/python)** – платежи через Stripe.  
