#lang #lang-c_sharp

---
Ленивые тип (или отложенная инициализация) - представленны в C# в виде универсального класса `Lazy<T>`. 
Который инициализирует объект типа только при обращении к свойству `Value`.

```csharp
// Пример:

class Reader
{
    Lazy<Library> library = new Lazy<Library>();
    public void ReadBook()
    {
        library.Value.GetBook();
        Console.WriteLine("Читаем бумажную книгу");
    }
 
    public void ReadEbook()
    {
        Console.WriteLine("Читаем книгу на компьютере");
    }
}

class Library
{
    private string[] books = new string[99];
 
    public void GetBook()
    {
        Console.WriteLine("Выдаем книгу читателю");
    }
}
```

### Inner links:


### Outer links: