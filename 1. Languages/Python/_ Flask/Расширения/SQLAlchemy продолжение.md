#lang #lang-python 

# SQLAlchemy: Продолжение

## Выборка записей из таблиц

- `Users.query.all()` — возвращает все записи.

На выходе получим список объектов, которые отображаются в соответствии с определением магического метода `__repr__` в классе `Users`:

```
[<users 1>, <users 2>, <users 3>]
```

```python
res = Users.query.all()
res[0].email  # Каждый объект содержит все атрибуты записи
```

- `f = Users.query.first()` — возвращает первую запись.

```python
f.id
```

- `Users.query.filter_by(id=1).all()` — возвращает записи по фильтру (только именованные параметры).
- `Users.query.filter(Users.id == 1).all()` — то же самое (любое логическое выражение) — лучше.

```python
Users.query.limit(2).all()  # Можно вставлять лимиты перед методом
Users.query.order_by(Users.email).all()  # Сортировка
Users.query.get(2)  # Получает запись по ключу
```

---

## Выборка из нескольких таблиц

```python
res = db.session.query(Users, Profiles).join(Profiles, Users.id == Profiles.user_id).all()
res[0].Users.email
res[0].Profiles.name
```

---

## Другой способ

В таблице `Users` (первичной таблице), к которой подбираются соответствующие записи из `Profiles` (вторичной), необходимо прописать переменную:

```python
pr = db.relationship('Profiles', backref='users', uselist=False)
```

Через неё будет устанавливаться связь с `Profiles` по внешнему ключу `user_id`.

---

### Определение внешнего ключа

```python
class Profiles(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Внешний ключ поля
```

```python
res[0].pr.name
```
