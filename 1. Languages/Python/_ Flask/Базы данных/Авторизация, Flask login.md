#lang #lang-python  

# Авторизация с Flask-Login

За функционал авторизации пользователей отвечает модуль **Flask-Login**. Для его использования его нужно установить:

```bash
pip install flask-login
```

### Класс `LoginManager`

`LoginManager` управляет процессом авторизации:

```python
from flask_login import LoginManager
login_manager = LoginManager(app)
```

Мы создаём объект класса управления и передаём ему ссылку на наше приложение (класс "рабочий").

### Работа с данными авторизации

Для работы с данными авторизации конкретного пользователя нужен класс, с которым мы будем взаимодействовать через `login_manager` (класс "инструмент"). Он будет описывать состояние текущего пользователя:

- статус авторизации,
- статус активности,
- способ определения уникального идентификатора пользователя:
	  - через авторизацию,
	  - через обращение к БД (для авторизованных, при отправке запросов).

---

### Пример "инструмента":

```python
class UserLogin():
    def fromDB(self, user_id, db):
        self.__user = db.getUser(user_id)
        return self

    def create(self, user):
        self.__user = user
        return self

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.__user['id'])
```

> **Примечание:** Все данные о пользователе хранятся в одной приватной переменной `__user`.

---

## Авторизация

В обработчике авторизации создаётся объект класса `UserLogin`, в котором сохраняется ключ для декоратора, и передаётся функции `login_user` (определена в модуле **Flask-Login**):

```python
userlogin = UserLogin().create(user)  # получение id (ключа) пользователя
login_user(userlogin)                 # активация декоратора @login_manager.user_loader и сохранение ключа в сессии
```

### Декоратор `@login_manager.user_loader`

Декоратор отвечает за загрузку данных о пользователе из БД через "инструмент", хранящийся в сессии после авторизации. Декоратор вызывается перед каждым запросом, если был загружен "инструмент" (`login_user(userlogin)`):

```python
@login_manager.user_loader
def load_user(user_id):
    print("load_user")
    return UserLogin().fromDB(user_id, dbase)
```

> **Примечание:** Функция декоратора `user_loader` вызывается после функции декоратора `before_query`, в которой мы устанавливаем соединение с БД.

---

## Ограничение доступа

Ограничение доступа к страницам осуществляется через декоратор `login_required`. Пример:

```python
@app.route("/post/<alias>")
@login_required
def showPost(alias):
    ...
```

### Пример метода загрузки пользователя из БД:

В классе управления БД должен быть метод подгрузки записи пользователя через декоратор `@login_manager.user_loader`:

```python
def getUser(self, user_id):
    self.__cur.execute(f"SELECT * FROM users WHERE id = {user_id}")
    res = self.__cur.fetchone()
    return res
```

### Метод для загрузки по логину (для авторизации):

```python
def getUserByEmail(self, email):
    self.__cur.execute(f"SELECT * FROM users WHERE email = {email}")
    res = self.__cur.fetchone()
    return res
```

---

## Пример обработчика авторизации

```python
@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        user = dbase.getUserByEmail(request.form['email'])  # загрузка данных пользователя по логину
        if user and check_password_hash(user['psw'], request.form['psw']):  # проверка пароля
            userlogin = UserLogin().create(user)  # создание "инструмента"
            login_user(userlogin)  # загрузка "инструмента" в сессию
            return redirect(url_for('index'))

        flash("Неверная пара логин/пароль", "error")

    return render_template("login.html", menu=dbase.getMenu(), title="Авторизация")
```

