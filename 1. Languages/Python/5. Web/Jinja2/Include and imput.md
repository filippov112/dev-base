#Python #Jinja2

# Include and Import

#### INCLUDE
Формирует готовую страницу до рендеринга, взаимодействие содержимого невозможно.

```jinja
{% include 'header.htm' %}  <!-- Подключение содержимого файла header -->
Содержимое страницы
{% include 'footer.htm' %}  <!-- То же самое -->
```

```jinja
{% include "header.html" ignore missing %}  <!-- Игнорирование исключения в случае отсутствия файла -->
```

С содержимым подключаемых файлов можно взаимодействовать так же, как и с основной страницей через `render`:

```python
'header.htm'  = '''{{domain}} {{title}}'''
'base.htm' = '''{% include 'header.htm' %}'''
tm = env.get_template('base.htm')
msg = tm.render(domain='http://proproprogs.ru', title="Про Jinja")
```

Если в блоке `include` требуется подключить сразу несколько файлов, то их следует указать в виде списка:

```jinja
{% include ['page1.htm', 'page2.htm'] ignore missing %}
```

#### IMPORT
Позволяет взаимодействовать с содержимым импортируемой страницы, например, с макросами.

Импорт через переменную ссылку `dlg`:
```jinja
{% import 'dialogs.htm' as dlg %}
Содержимое страницы
{{ dlg.dialog_1('Внимание', 'Это тестовый диалог') }}
```

Импорт макроса напрямую из файла в `dlg`:
```jinja
{% from 'dialogs.htm' import dialog_1 as dlg %}
Содержимое страницы
{{ dlg('Внимание', 'Это тестовый диалог') }}
```
