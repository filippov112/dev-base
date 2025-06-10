#lang #lang-python  

# Формы для сайта через WTF

## АВТОРИЗАЦИЯ

```python
class LoginForm(FlaskForm):
    email = StringField("Email: ", validators=[Email()])
    psw = PasswordField("Пароль: ", validators=[DataRequired(), Length(min=4, max=100)])
    remember = BooleanField("Запомнить", default=False)
    submit = SubmitField("Войти")
```

## РЕГИСТРАЦИЯ

```python
class RegisterForm(FlaskForm):
    name = StringField("Имя: ", validators=[Length(min=4, max=100, message="Имя должно быть от 4 до 100 символов")])
    email = StringField("Email: ", validators=[Email("Некорректный email")])
    psw = PasswordField("Пароль: ", validators=[DataRequired(), Length(min=4, max=100, message="Пароль должен быть от 4 до 100 символов")])
    psw2 = PasswordField("Повтор пароля: ", validators=[DataRequired(), EqualTo('psw', message="Пароли не совпадают")])
    submit = SubmitField("Регистрация")
```

### Описание:
- **LoginForm**: Форма для авторизации с полями для ввода email, пароля и флажком для запоминания пользователя.
- **RegisterForm**: Форма для регистрации с полями для имени, email, пароля и подтверждения пароля.