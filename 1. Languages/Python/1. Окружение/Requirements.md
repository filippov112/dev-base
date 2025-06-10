#Python 

# Файл настройки окружения

[Виртуальное окружение](1.%20Languages/Python/1.%20Окружение/Виртуальное%20окружение.md)

Для создания `requirements.txt`:

```bash
pip freeze > requirements.txt
```

```
cd C:\ваш_проект       # перейти в папку с requirements.txt
python -m pip install --upgrade pip  # обновить pip (опционально)
pip install -r requirements.txt      # установить зависимости
```

### Возможные ошибки и решения:

Убедитесь, что Python доступен из командной строки. Введите:
```
python --version
```

- **"pip не найден"** → Переустановите Python с галочкой **"Add Python to PATH"**.

- **Для виртуального окружения**:
```
    python -m venv venv       # создание окружения
    .\venv\Scripts\activate   # активация (Windows)
    pip install -r requirements.txt
```

### **Выберите интерпретатор в VS Code**
1. Нажмите `Ctrl+Shift+P` → введите **`Python: Select Interpreter`**.
2. Выберите интерпретатор из папки `venv` (путь будет примерно таким):
```
    .\venv\Scripts\python.exe
```