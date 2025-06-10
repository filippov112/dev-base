#lang #lang-python 

# WTForms обработка ошибок

Ошибки автоматически генерируются и доступны в шаблоне из коллекции:

`form.<переменная поля>.errors`

---

Добавим их вывод на примере поля email:

```html
{{ form.email.label() }} 
{% if form.email.errors %}
    {{ form.email(class="invalid") }}
    <span class="invalid-feedback">
        {% for e in form.email.errors %}
            {{ e }}
        {% endfor %}
    </span>
{% else %}
    {{ form.email() }}
{% endif %}
```

---

Прописывая валидатор в шаблоне класса, в параметрах можно прописать свой текст ошибки:

```python
[Email("Некорректный email")]
```

---

Вывод всех полей формы в шаблоне через цикл:

```html
{% for field in form if field.name not in ['csrf_token', 'remember', 'submit'] -%} 
    {# исключаем поля защиты, запоминания и кнопку, их лучше прописать в ручную, так как у них не может быть ошибок #}

    {{ field.label() }} 						  
    {% if field.errors %}
        {{ field(class="invalid") }}
        <span class="invalid-feedback">
            {% for e in field.errors %}
                {{ e }}
            {% endfor %}
        </span>
    {% else %}
        {{ field() }}
    {% endif %}
{% endfor %}
```
