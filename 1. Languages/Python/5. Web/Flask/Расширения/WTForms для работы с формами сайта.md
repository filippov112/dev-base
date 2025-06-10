#Python #Flask

# WTForms для работы с формами сайта

Flask-WTF устанавливается с помощью команды:

```bash
pip install flask_wtf
```

Концепция создания форм здесь состоит в расширении базового класса `FlaskForm`. Все поля формы описываются переменными этого класса и ссылаются на соответствующие объекты, которые могут быть образованы из следующих встроенных классов:

- **StringField** – для работы с полем ввода;
- **PasswordField** – для работы с полем ввода пароля;
- **BooleanField** – для checkbox полей;
- **TextAreaField** – для работы с вводом текста;
- **SelectField** – для работы со списком;
- **SubmitField** – для кнопки submit.

Это лишь часть классов. Классы расширения берутся из встроенной библиотеки WTForms – это библиотека, написанная на Python и независимая от фреймворков.

---

Создадим в нашем проекте вспомогательный файл `forms.py`, в котором будем определять все классы форм, и начнем с класса `LoginForm`:

```python
from flask_wtf import FlaskForm  # импорт из модуля базового класса форм
from wtforms import StringField, SubmitField, BooleanField, PasswordField
from wtforms.validators import DataRequired, Email, Length
 
class LoginForm(FlaskForm):
    email = StringField("Email: ", validators=[Email()])
    psw = PasswordField("Пароль: ", validators=[DataRequired(), Length(min=4, max=100)])
    remember = BooleanField("Запомнить", default=False)
    submit = SubmitField("Войти")
```

`validators` - содержит список валидаторов, с помощью которых выполняется проверка корректности введенных данных:

- **DataRequired** – валидатор, требующий ввода каких-либо данных;
- **Email** – проверяет корректность введенного email-адреса; (при необходимости установите: `pip install email-validator`)
- **Length** – проверяет количество введенных символов.

---

В обработчике создадим экземпляр формы и передадим шаблону `login.html`:

```python
@app.route("/login", methods=["POST", "GET"])
def login():
    form = LoginForm()
    return render_template("login.html", menu=dbase.getMenu(), title="Авторизация", form=form)
```

---

Настроим отображение формы в шаблоне:

```html
<form action="" method="post" class="form-contact">
    {{ form.hidden_tag() }}  <!-- создает скрытое поле, содержащее токен, используемый для защиты формы от CSRF-атак. -->
    {{ form.email.label() }} {{ form.email() }}
    {{ form.psw.label() }} {{ form.psw() }}
    {{ form.remember.label() }} {{ form.remember() }}
    {{ form.submit() }}
</form>
```

---

Выполним обработку пост-запроса:

```python
@app.route("/login", methods=["POST", "GET"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))
 
    form = LoginForm()  # ничего не меняем
    if form.validate_on_submit():  # добавляем только проверку данных запроса валидаторами
        user = dbase.getUserByEmail(form.email.data)  # обращение к данным формы происходит через точку
        if user and check_password_hash(user['psw'], form.psw.data):  # form.psw.data
            userlogin = UserLogin().create(user)  # 
            rm = form.remember.data  # 
            login_user(userlogin, remember=rm)  # оставляем всё тот же функционал
            return redirect(request.args.get("next") or url_for("profile"))  # 
        flash("Неверная пара логин/пароль", "error")  # 
    return render_template("login.html", menu=dbase.getMenu(), title="Авторизация", form=form)
```
