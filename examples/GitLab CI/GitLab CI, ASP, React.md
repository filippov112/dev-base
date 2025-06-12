#example #theory-enterprice 

---
### 1. Создание репозиториев в GitLab

1. **Войдите в GitLab**:
   - Перейдите на [GitLab](https://gitlab.com) и войдите в свою учетную запись.

2. **Создайте новый проект**:
   - Нажмите на кнопку "New project" (Новый проект).
   - Выберите "Create blank project" (Создать пустой проект).
   - Введите имя проекта (например, `webapi` для ASP.NET WebAPI и `frontend` для React).
   - Укажите видимость проекта (публичный или приватный).
   - Нажмите "Create project" (Создать проект).

3. **Добавьте код в репозитории**:
   - Клонируйте репозиторий на локальную машину:
     ```bash
     git clone https://gitlab.com/ваш-username/webapi.git
     git clone https://gitlab.com/ваш-username/frontend.git
     ```
   - Скопируйте код вашего ASP.NET WebAPI в папку `webapi` и код React проекта в папку `frontend`.
   - Добавьте изменения в Git и выполните commit и push:
     ```bash
     cd webapi
     git add .
     git commit -m "Initial commit for WebAPI"
     git push origin main

     cd ../frontend
     git add .
     git commit -m "Initial commit for Frontend"
     git push origin main
     ```

### 2. Настройка CI/CD для ASP.NET WebAPI

1. **Создайте файл `.gitlab-ci.yml`**:
   - В корневой папке проекта `webapi` создайте файл `.gitlab-ci.yml`.
   - Добавьте следующий конфигурационный код для сборки и тестирования ASP.NET проекта:

     ```yaml
     stages:
       - build
       - test
       - deploy

     build:
       stage: build
       script:
         - dotnet restore
         - dotnet build --configuration Release
       artifacts:
         paths:
           - bin/Release/net6.0/publish/

     test:
       stage: test
       script:
         - dotnet test

     deploy:
       stage: deploy
       script:
         - echo "Deploying to production server..."
         # Добавьте команды для деплоя на ваш сервер
       only:
         - main
     ```

2. **Настройте переменные окружения** (если необходимо):
   - Перейдите в раздел "Settings" -> "CI / CD" -> "Variables" и добавьте необходимые переменные, такие как учетные данные для деплоя.

### 3. Настройка CI/CD для React проекта

1. **Создайте файл `.gitlab-ci.yml`**:
   - В корневой папке проекта `frontend` создайте файл `.gitlab-ci.yml`.
   - Добавьте следующий конфигурационный код для сборки и деплоя React проекта:

     ```yaml
     image: node:latest

     stages:
       - build
       - deploy

     cache:
       paths:
         - node_modules/

     build:
       stage: build
       script:
         - npm install
         - npm run build
       artifacts:
         paths:
           - build/

     deploy:
       stage: deploy
       script:
         - echo "Deploying to production server..."
         # Добавьте команды для деплоя на ваш сервер
       only:
         - main
     ```

2. **Настройте переменные окружения** (если необходимо):
   - Перейдите в раздел "Settings" -> "CI / CD" -> "Variables" и добавьте необходимые переменные, такие как учетные данные для деплоя.

### 4. Запуск CI/CD

1. **Запустите pipeline**:
   - После добавления файлов `.gitlab-ci.yml` в оба репозитория, GitLab автоматически запустит pipeline при каждом push в ветку `main`.
   - Вы можете отслеживать статус pipeline в разделе "CI / CD" -> "Pipelines".

2. **Проверка деплоя**:
   - Убедитесь, что ваш код успешно деплоится на сервер и работает корректно.

### 5. Дополнительные настройки (опционально)

- **Интеграция с Docker**: Если вы используете Docker, вы можете добавить этапы сборки и публикации Docker-образов в ваш CI/CD pipeline.
- **Уведомления**: Настройте уведомления о статусе pipeline через email, Slack или другие каналы.
- **Окружения**: Настройте разные окружения (staging, production) для более гибкого управления деплоем.

Теперь у вас настроены CI/CD pipelines для обоих проектов, и вы можете автоматизировать процесс сборки, тестирования и деплоя вашего ASP.NET WebAPI и React приложения.