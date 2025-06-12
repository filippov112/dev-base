#lang #lang-python 

---
> **line_profiler** - это инструмент для построчного профилирования кода Python. Он позволяет отслеживать время выполнения каждой строки кода в функции, а также количество раз, когда каждая строка выполняется.

**Установка:** `pip install line_profiler`

### Способы

##### **Декоратор @profile:**
1. Install line_profiler: `pip install line_profiler`.
2. Decorate function(s) you want to profile with `@profile`. The decorator will be made automatically available on run.
3. Run `kernprof -lv script_to_profile.py`.

```python
from line_profiler import LineProfiler

def my_function(n):
    for i in range(n):
        # Выполнение вычислений
        pass

@profile
def main():
    my_function(1000)

if __name__ == "__main__":
    main()
```


##### **Использование класса LineProfiler:**

1. Создайте экземпляр `LineProfiler()`.
2. Передайте экземпляру `LineProfiler()` функцию, которую хотите профилировать, с помощью метода `add_function()`.
3. Запустите функцию как обычно.
4. Вызовите метод `print_report()` экземпляра `LineProfiler()`, чтобы получить отчет в виде текста.
	- Фильтрация строк по времени выполнения: `line_profiler.print_report(top=10)` покажет только 10 строк, на выполнение которых затрачено больше всего времени.
	- Сортировка по столбцам: `line_profiler.print_report(sort='tottime')` отсортирует отчет по общему времени выполнения.

### Отчет:
В отчете каждая строка кода представлена ​​как отдельная запись.
- **Line:** Номер строки кода.
- **Hits:** Количество раз, когда строка была выполнена.
- **Time:** Общее время выполнения строки в секундах.
- **Per call:** Среднее время выполнения строки за один вызов в секундах.


### Дополнительные возможности:


- Использование с IPython: `%lprun` в IPython запустит функцию с помощью line_profiler.

### Ссылки:

- Документация line_profiler: [https://docs.python.org/3/library/profile.html](https://docs.python.org/3/library/profile.html)
- Профилирование Python-программ: [https://habr.com/ru/articles/797393/](https://habr.com/ru/articles/797393/)
- Python-профайлеры: [https://xakep.ru/2015/07/22/python-production-profiling/](https://xakep.ru/2015/07/22/python-production-profiling/)