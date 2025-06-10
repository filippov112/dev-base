#lang #lang-c_sharp 

# Класс StringBuilder в C#

Этот класс представляет *динамическую* строку.
Каждый автоматический перерасчет выделенной памяти увеличивает значение на N-бит (в 2^n раз), поэтому при возможности стоит сразу указывать конкретный размер буфера.

```csharp
StringBuilder sb = new StringBuilder();
var sb = new StringBuilder(32); // capacity
StringBuilder sb = new StringBuilder("Привет мир");
var sb = new StringBuilder("Привет мир", 32); // capacity

Console.WriteLine(sb.ToString());    //  Hello World
Console.WriteLine(sb);    //  Hello World
```

**Свойства:**
- `Length` - длина строки
- `Capacity` - выделенный объем памяти (в символах, 16 по ум., можно задавать сразу)
**Методы:**
- `Append` - добавляет подстроку
- `Insert` - вставляет подстроку, начиная с определенного индекса
- `Remove` - удаляет определенное количество символов, начиная с определенного индекса
- `Replace` - заменяет все вхождения одного символа/подстроки на другой/-ую
- `AppendFormat` - добавляет подстроку в конец

**Примеры:**

```csharp
var sb = new StringBuilder("Привет мир");
sb.Append("!");
sb.Insert(7, "компьютерный ");
Console.WriteLine(sb);  // Привет компьютерный мир!
 
// заменяем слово
sb.Replace("мир", "world");
Console.WriteLine(sb);  // Привет компьютерный world!
 
// удаляем 13 символов, начиная с 7-го
sb.Remove(7, 13);
Console.WriteLine(sb);  // Привет world!
```

### Inner links:
[1. Строки и символы](1.%20Languages/C-sharp/0.%20Введение/4.%20Строки%20и%20символы/1.%20Строки%20и%20символы.md)

### Outer links: