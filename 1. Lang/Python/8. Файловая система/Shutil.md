#lang #lang-python 

---
>Библиотека `shutil` в Python предоставляет набор функций высокого уровня для работы с файлами и папками. `shutil` часто используется вместе с модулем `os`, который предоставляет более низкоуровневые функции для работы с файловой системой.
>Она упрощает задачи, такие как:
>- **Копирование:** Копирование файлов и папок в другое место.
>- **Перемещение:** Перемещение файлов и папок в другое место (изменение имени).
>- **Удаление:** Удаление файлов и папок.
>- **Создание ссылок:** Создание символических ссылок на файлы и папки.
>- **Распаковка архивов:** Распаковка архивов в заданное место.

### Методы:
- `shutil.copy(src, dst)`: Копирует файл `src` в `dst`.
- `shutil.copy2(src, dst)`: Копирует файл `src` в `dst`, сохраняя метаданные.
- `shutil.move(src, dst)`: Перемещает файл `src` в `dst` (изменяет имя).
- `shutil.rmtree(dir)`: Рекурсивно удаляет папку `dir` и все ее содержимое.
- `shutil.copytree(src, dst)`: Рекурсивно копирует все дерево каталогов из `src` в `dst`.
- `shutil.make_archive(archive_name, format, root_dir, **kwargs)`: Создает архив из `root_dir` с именем `archive_name` в формате `format`.
- `shutil.unpack_archive(archive_name, extract_dir, **kwargs)`: Распаковывает архив `archive_name` в `extract_dir`.

### Пример:
```Python
import shutil

# Копировать файл "file.txt" в "new_file.txt"
shutil.copy("file.txt", "new_file.txt")

# Переместить папку "old_dir" в "new_dir"
shutil.move("old_dir", "new_dir")

# Удалить папку "temp_dir" и все ее содержимое
shutil.rmtree("temp_dir")

# Рекурсивно скопировать все содержимое "source_dir" в "target_dir"
shutil.copytree("source_dir", "target_dir")

# Создать архив ZIP из "my_dir" с именем "my_archive.zip"
shutil.make_archive("my_archive", "zip", "my_dir")

# Распаковать архив TAR "my_archive.tar.gz" в "destination_dir"
shutil.unpack_archive("my_archive.tar.gz", "destination_dir")
```

### Ссылки:
- [Официальная документация shutil](https://docs.python.org/3/library/shutil.html)
- [Модуль shutil | Python 3 для начинающих и чайников](https://pythonworld.ru/moduli/modul-shutil.html)
- [Как работать с модулем shutil в Python](https://sky.pro/media/kak-rabotat-s-modulem-shutil-v-python/)