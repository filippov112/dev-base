#lang #lang-python 

## Библиотека Urllib в Python
>Библиотека **Urllib** в Python предоставляет набор инструментов для работы с URL-адресами и веб-запросами. 
>Она позволяет:
>- **Отправлять запросы HTTP и HTTPS**: Получать веб-страницы, изображения, JSON и другие данные из интернета.
>- **Обрабатывать URL-адреса**: Разбирать URL-адреса на части, кодировать и декодировать URL-строки.
>- **Работать с ошибками**: Обрабатывать ошибки, возникающие при работе с сетью.
>- **Аутентификация**: Предоставлять авторизационные данные для доступа к защищенным ресурсам.
>- **Работа с куки**: Отправлять и получать куки-файлы.
>- **Загрузка файлов**: Скачивать файлы из интернета.

### Методы
- `urllib.request.urlopen(url)`: открывает URL-адрес и возвращает объект `http.client.HTTPResponse`
- `urllib.request.Request(url, data=None, headers={}, method=None)`: Создает объект `urllib.request.Request` для отправки HTTP-запроса.
- `urllib.parse.urlparse(url)`: Разбирает URL-адрес на его составляющие (схема, хост, путь и т. д.).
- `urllib.parse.urlencode(params)`: Преобразует словарь параметров в URL-строку.
- `urllib.error.HTTPError`: Ошибка HTTP, возникающая при неудачном запросе.
- `urllib.parse.urljoin(base, url)`: объединяет два URL-адреса
- `urllib.request.urlretrieve(url, filename)`: загружает URL-адрес и сохраняет его в файл

### Пример
```python
import urllib.request

# Отправить GET-запрос и получить ответ
response = urllib.request.urlopen("https://www.example.com")

# Проверить код ответа
if response.status == 200:
    # Получить содержимое ответа
    data = response.read().decode("utf-8")
    print(data)
else:
    print("Ошибка:", response.status)
```

```python
import urllib.request

# Загрузить веб-страницу и распечатать ее содержимое
url = "https://example.com/"
response = urllib.request.urlopen(url)
data = response.read().decode('utf-8')
print(data)

# Скачать файл и сохранить его под именем "image.jpg"
url = "https://unsplash.com/"
urllib.request.urlretrieve(url, "image.jpg")

# Преобразовать словарь данных в URL-строку
data = {'name': 'John Doe', 'email': 'johndoe@example.com'}
url_encoded_data = urllib.request.urlencode(data)
print(url_encoded_data)
```

### Ссылки
- [Официальная документация urllib](https://docs.python.org/3/library/urllib.html)
- [Как работать с модулем urllib в Python](https://sky.pro/media/kak-rabotat-s-modulem-urllib-v-python/)
- [Использование модуля Python urllib: открытие URL-адресов, получение доступа к данным](https://webformyself.com/python-urllib-request-i-urlopen/)

### Примечания
>[!note]
Библиотека `urllib` устарела в Python 3. Рекомендуется использовать более современную библиотеку `requests`, которая обладает более широкими возможностями и более простым интерфейсом.

>[!note]
Существует также библиотека `urllib3`, которая является расширением `urllib` и обеспечивает дополнительные функции, такие как поддержка пулов соединений и сжатия.