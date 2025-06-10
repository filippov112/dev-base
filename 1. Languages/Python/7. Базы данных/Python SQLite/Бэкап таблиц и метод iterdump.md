#Python #sqlite

# Бэкап таблиц и метод `iterdump`

С помощью метода `iterdump` можно создать точную копию базы данных. 

Пример кода:

```python
import sqlite3 as sq

with sq.connect("cars.db") as con:
    cur = con.cursor()
    
    # iterdump возвращает в виде итератора список
    # всех SQL запросов для создания точной копии БД
    for sql in con.iterdump():
        print(sql)
```

Можно сохранить все запросы в файл:

```python
with open("sql_dump.sql", "w") as f:
    for sql in con.iterdump():
        f.write(sql)
```

А затем, считав сразу весь файл методом `read`, воспроизвести копию базы данных через `executescript`:

```python
with open("sql_dump.sql", "r") as f:
    sql = f.read()
    cur.executescript(sql)
```
