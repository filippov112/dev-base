#lang #lang-c_sharp  

---
Такие поля класса или структуры, значение которых нельзя изменить.
Определяются либо на компиляции, либо в конструкторе.
Не являются статическими по умолчанию (в отличие от констант).

> При создании *свойства для чтения* readonly указывать не обязательно.

```csharp
Person tom = new Person("Tom");
Console.WriteLine(tom.name);
 
//tom.name = "Sam"; // !Ошибка: нельзя изменить
class Person
{
    public readonly string name = "Undefined"; // можно так инициализировать
    public Person(string name)
    {
        this.name = name; // в конструкторе также можно присвоить значение полю для чтения
    }
}
```

---

### Структуры для чтения

Все поля таких структур должны быть readonly.

```csharp
readonly struct Person
{
    public readonly string name;
    public Person(string name)
    {
        this.name = name;
    }
}
```

### Inner links:
[1. Статические элементы](1.%20Lang/C-sharp/0.%20Введение/2.%20Классовые%20механизмы/Статика/1.%20Статические%20элементы.md)


### Outer links:
