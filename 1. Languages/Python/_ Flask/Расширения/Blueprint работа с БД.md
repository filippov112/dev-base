#lang #lang-python #flask

---
```python
db = None

@admin.before_request
def before_request():
    """Установление соединения с БД перед выполнением запроса"""
    global db
    db = g.get('link_db')  # получение ссылки на файл управления БД из основного приложения через переменную g

# смотреть про link_db в "Установка соединения с бд через перехват запроса" (Flask\Базы данных)

@admin.teardown_request
def teardown_request(request):
    global db
    db = None
    return request
```

После этого при каждом запросе будет создаваться ссылка на БД. В обработчике останется создать курсор и свободно управлять БД.
