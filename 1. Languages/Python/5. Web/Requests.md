 #lang #lang-python 

# Requests в Python

>Библиотека **Requests** упрощает работу с HTTP-запросами в Python. Она позволяет:
>- Отправлять GET, POST, PUT, DELETE и другие запросы к веб-серверам
>- Получать и обрабатывать ответы от серверов
>- Работать с заголовками, куки и другими данными запроса
>- Авторизоваться на веб-сайтах
>- Скачивать файлы
>- И многое другое!

### Методы
- `requests.get(url)`: Отправляет GET-запрос и возвращает ответ
- `requests.post(url, data=data)`: Отправляет POST-запрос с данными в формате JSON или другом формате
- `requests.put(url, data=data)`: Отправляет PUT-запрос для обновления данных на сервере
- `requests.delete(url)`: Отправляет DELETE-запрос для удаления данных на сервере
- `requests.head(url)`: Отправляет HEAD-запрос для получения информации о запросе без получения самого ответа
- `response.raise_for_status()` Автоматически обрабатывает ошибки HTTP.

### Пример
```python
import requests

# Отправить GET-запрос к сайту https://example.com
response = requests.get('https://example.com')

# Проверить код ответа
if response.status_code == 200:
  # Запрос выполнен успешно
  print(response.text)  # Печатать содержимое страницы
else:
  # При запросе возникла ошибка
  print('Ошибка:', response.status_code)

# Отправить POST-запрос с данными
data = {'username': 'admin', 'password': '12345'}
response = requests.post('https://example.com/login', data=data)

# Проверить, авторизовались ли мы
if response.status_code == 200:
  # Авторизация прошла успешно
  print('Вы авторизованы!')
else:
  # Не удалось авторизоваться
  print('Неверный логин или пароль')
```

### Ссылки
- [https://python.ru/post/97/](https://python.ru/post/97/)
- [https://www.youtube.com/@skillboxprogramming/videos](https://www.youtube.com/@skillboxprogramming/videos)
- [https://olivierkonate.medium.com/python-requests-library-beginner-60f59112c71d](https://olivierkonate.medium.com/python-requests-library-beginner-60f59112c71d)
