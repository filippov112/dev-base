#lang #lang-python #flask

---
SQLAlchemy позволяет построить универсальную программу, не привязанную к конкретной СУБД.

Для фреймворка Flask разработано специальное расширение, которое значительно упрощает 
настройку и использование самого SQLAlchemy:

## Flask-SQLAlchemy

Команда для установки:
```
pip install Flask-SQLAlchemy
```

### Подключение

```python
from flask_sqlalchemy import SQLAlchemy
```

### Инициализация СУБД и БД

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'  # корневой каталог программы
```

### Примеры других СУБД

- PostgreSQL: `postgresql://user:password@localhost/mydatabase`
- MySQL: `mysql://user:password@localhost/mydatabase`
- Oracle: `oracle://user:password@127.0.0.1:1521/mydatabase`

### Создание файла управления БД

```python
db = SQLAlchemy(app)
```

### Таблицы

Таблицы представляют собой дочерние классы от `Model`.

```python
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # столбцы это объекты класса column
    email = db.Column(db.String(50), unique=True)
    psw = db.Column(db.String(500), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)  # from datetime import datetime
 
    def __repr__(self):  # представление объекта таблицы в консоли (необязательный)
        return f"<users {self.id}>"

class Profiles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    old = db.Column(db.Integer)
    city = db.Column(db.String(100))
 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # внешний ключ поля
 
    def __repr__(self):
        return f"<profiles {self.id}>"
```

### Типы данных полей

- `Integer` – целочисленный
- `String(size)` – строка максимальной длиной size
- `Text` – текст (в формате Unicode)
- `DateTime` – дата и время, представленные в формате объекта `datetime`
- `Float` – число с плавающей точкой (вещественное)
- `Boolean` – логическое значение
- `LargeBinary` – для больших произвольных бинарных данных (например, изображений)

### Добавление записей в таблицу(ы)

```python
if request.method == "POST":
    # здесь должна быть проверка корректности введенных данных
    try:
        hash = generate_password_hash(request.form['psw'])
        u = Users(email=request.form['email'], psw=hash)  # создаём объект того класса, в какую таблицу собираемся его положить
        db.session.add(u)  # кладём объект в сессию файла управления
        db.session.flush()  # создаём предварительное сохранение с возможностью отката
 
        p = Profiles(name=request.form['name'], old=request.form['old'],
                     city=request.form['city'], user_id=u.id)  # используя раннее сохранение, передаём в качестве параметра ссылку на ранее записанный объект u.id
        db.session.add(p)  # добавляем второй объект
        db.session.commit()  # производим сохранение изменений в БД
    except:
        db.session.rollback()  # в случае ошибки на каком-либо этапе возвращаем исходное состояние БД
        print("Ошибка добавления в БД")
 
    return redirect(url_for('index'))
```
