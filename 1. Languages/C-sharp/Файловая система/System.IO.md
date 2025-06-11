#lang #lang-c_sharp  

---
> Библиотека **System.IO** содержит множество классов и методов для работы с файлами, папками и потоками данных. Что позволяет делать:
> 
- **Работа с потоками данных:**
>     - Чтение и запись данных из различных источников, таких как файлы, сетевые соединения и память.
>     - Преобразование форматов данных, например, из текста в двоичный код и наоборот.
>     - Буферизация данных для повышения производительности.
> - **Ввод и вывод текста:**
>     - Чтение и запись текстовых данных с использованием кодировок символов.
>     - Работа с строками, например, поиск, замена и разделение.
> - **Работа с файлами и папками:**
>     - Создание, удаление, перемещение и копирование файлов и папок.
>     - Чтение и запись данных в файлы.
>     - Получение информации о файлах и папках (размер, дата создания, атрибуты).
>     - Поиск файлов и папок.
>     - Работа с потоками данных.
>     - Отслеживание изменений в файловой системе.
> - **Работа с текстовыми файлами:**
>     - Чтение и запись текстовых данных.
>     - Кодировка и декодировка текстовых данных.
>     - Работа с построчным чтением и записью.
> - **Работа с двоичными файлами:**
>     - Чтение и запись двоичных данных.
>     - Сериализация и десериализация объектов.
> - **Работа с консолью:**
>     - Ввод и вывод данных в консоль.
>     - Форматирование вывода.

### Классы:

- **File:** Работа с файлами.
- **Directory:** Работа с папками.
- **FileStream:** Чтение и запись данных в файлы.
- **StreamReader:** Чтение текстовых данных из файлов.
- **StreamWriter:** Запись текстовых данных в файлы.
- **MemoryStream:** Чтение и запись данных в память.

### Методы:

|Класс|Метод|Действие|
|---|---|---|
|**File**|Create(string path)|Создает файл.|
||Open(string path, FileMode mode, FileAccess access)|Открывает файл для чтения, записи или чтения/записи.|
||ReadAllBytes(string path)|Читает все содержимое файла в виде массива байтов.|
||ReadAllText(string path, Encoding encoding)|Читает все содержимое файла в виде строки с использованием заданной кодировки.|
||WriteAllBytes(string path, byte[] bytes)|Записывает массив байтов в файл.|
||WriteAllText(string path, string text, Encoding encoding)|Записывает строку в файл с использованием заданной кодировки.|
||Exists(string path)|Проверяет, существует ли файл.|
||Delete(string path)|Удаляет файл.|
||Move(string sourcePath, string destPath)|Перемещает файл.|
||Copy(string sourcePath, string destPath)|Копирует файл.|
||GetAttributes(string path)|Возвращает атрибуты файла.|
||SetAttributes(string path, FileAttributes attributes)|Устанавливает атрибуты файла.|
||GetCreationTime(string path)|Возвращает время создания файла.|
||GetLastAccessTime(string path)|Возвращает время последнего доступа к файлу.|
||GetLastWriteTime(string path)|Возвращает время последнего изменения файла.|
||GetFileSize(string path)|Возвращает размер файла.|
|**Directory**|CreateDirectory(string path)|Создает папку.|
||Exists(string path)|Проверяет, существует ли папка.|
||GetDirectories(string path)|Возвращает список подпапок в указанной папке.|
||GetFiles(string path)|Возвращает список файлов в указанной папке.|
||Move(string sourcePath, string destPath)|Перемещает папку.|
||Delete(string path)|Удаляет папку.|
||GetCreationTime(string path)|Возвращает время создания папки.|
||GetLastAccessTime(string path)|Возвращает время последнего доступа к папке.|
||GetLastWriteTime(string path)|Возвращает время последнего изменения папки.|
||GetAttributes(string path)|Возвращает атрибуты папки.|
||SetAttributes(string path, DirectoryAttributes attributes)|Устанавливает атрибуты папки.|
|**Path**|Combine(string path1, string path2)|Объединяет два пути.|
||GetDirectoryName(string path)|Возвращает имя папки из указанного пути.|
||GetFileName(string path)|Возвращает имя файла из указанного пути.|
||GetExtension(string path)|Возвращает расширение файла из указанного пути.|
||ChangeExtension(string path, string extension)|Изменяет расширение файла.|
||GetFullPath(string path)|Возвращает полный путь к файлу или папке.|
||GetRelativePath(string baseDirectory, string path)|Возвращает относительный путь к файлу или папке.|
|**Stream**|Read(byte[] buffer, int offset, int count)|Читает данные из потока в буфер.|
||Write(byte[] buffer, int offset, int count)|Записывает данные в поток из буфера.|
||Flush()|Очищает буфер потока.|
||Seek(long offset, SeekOrigin origin)|Перемещает позицию чтения/записи в потоке.|

**Примечание:**
- Эта таблица содержит не все методы этих классов.
- 
### Примеры:

**1. Чтение текстового файла:**
```csharp
using System.IO;

string filePath = @"C:\path\to\file.txt";
string text;

try
{
    using (StreamReader reader = new StreamReader(filePath))
    {
        text = reader.ReadToEnd();
    }
}
catch (IOException e)
{
    Console.WriteLine("Error reading file: {0}", e.Message);
}

Console.WriteLine(text);
```

**2. Запись текстового файла:**
```csharp
using System.IO;

string filePath = @"C:\path\to\file.txt";
string text = "This is the text to write to the file.";

try
{
    using (StreamWriter writer = new StreamWriter(filePath))
    {
        writer.WriteLine(text);
    }
}
catch (IOException e)
{
    Console.WriteLine("Error writing file: {0}", e.Message);
}
```

**3. Копирование файла:**
```csharp
using System.IO;

string sourceFilePath = @"C:\path\to\source.txt";
string destinationFilePath = @"C:\path\to\destination.txt";

try
{
    File.Copy(sourceFilePath, destinationFilePath);
}
catch (IOException e)
{
    Console.WriteLine("Error copying file: {0}", e.Message);
}
```



### Inner links:

### Outer links:
- [https://learn.microsoft.com/en-us/dotnet/api/system.io?view=net-8.0](https://learn.microsoft.com/en-us/dotnet/api/system.io?view=net-8.0)
- [https://www.tutorialspoint.com/csharp/pdf/csharp_file_io.pdf](https://www.tutorialspoint.com/csharp/pdf/csharp_file_io.pdf)
- [https://www.javatpoint.com/c-sharp-filestream](https://www.javatpoint.com/c-sharp-filestream)
