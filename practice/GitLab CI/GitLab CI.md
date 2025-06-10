#devops #Docker

# Настройка пайплайна с использованием GitLab CI в Docker

**Создание файла `.gitlab-ci.yml`**
Определите этапы сборки, тестирования и деплоя вашего приложения.

В этом примере:
- build: Собирает Docker-образ приложения.
- test: Запускает контейнер и выполняет тесты.
- deploy: Авторизуется в реестре, тегирует и отправляет образ.
    
```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
	- docker build -t myapp:latest .

test:
  stage: test
  script:
	- docker run --rm myapp:latest npm test

deploy:
  stage: deploy
  script:
	- docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" $CI_REGISTRY
	- docker tag myapp:latest $CI_REGISTRY/mygroup/myapp:latest
	- docker push $CI_REGISTRY/mygroup/myapp:latest
```
