#Csharp 

# Records в C#

**Record-типы** - **классы** (C#9) и **структуры** (C#10) с возможностями некоторой базовой реализации для упрощения работы с ними.
Образуются с помощью ключевого слова `record`.
- Ссылочный тип.
- Могут быть *неизменяемыми*.
- Предоставляют базовую реализацию *поверхностного сравнения* через `Equals(), ==/!=`, сравнивая значения полей, а не hash-коды объектов.
- Поддерживают `with`-копирование (см. структуры).
- Поддерживают *краткую инициализацию* (для **классов** - *неизменяемая*, для **структур** - необходимо добавлять `readonly`), которую можно смешивать с обычным определением членов.
- Имеют базовую реализацию `ToString()` типа `Person {Name = Tom, Age = 37}`.

```csharp
// Пример:

public record Person // public record class - можно не писать (но если написали - не будет ошибкой), в отличие от структуры
{
    public string Name { get; set; }
    public Person(string name) => Name = name;
}

public record struct Person
{
    public string Name { get; set; }
    public Person(string name) => Name = name;
}
```


**`with`-копирование:**

```csharp
var tom = new Person("Tom", 37);
var sam = tom with { Name = "Sam" }; // Для полной копии можно оставить скобки пустыми
 
public record Person
{
    public string Name { get; init; }
    public int Age { get; init; }
    public Person(string name, int age)
    {
        Name = name; Age = age;
    }
}
```

**Краткая инициализация:**

```csharp
public record Person
{
    public string Name { get; init; }
    public int Age { get; init; }
    
    public Person(string name, int age)
    {
        Name = name; Age = age;
    }
    
    public void Deconstruct(out string name, out int age) => (name, age) = (Name, Age);
}

// аналог:

public record Person(string Name, int Age);

// =============================
// Смешанный вариант класса:

var person = new Person("Tom", 37) { Company = "Google"};
 
public record Person(string Name, int Age)
{
    public string Company { get; set; } = "";
}

// =============================
// Структуры (readonly-пример):

public readonly record struct Person(string Name, int Age);
```

**Наследование:**
```csharp
public record Person(string Name, int Age);
public record Employee(string Name, int Age, string Company) : Person(Name, Age);
```

### Inner links:
[1. Классы](1.%20Languages/C-sharp/0.%20Введение/2.%20Классы%20и%20структуры/1.%20Классы.md)
[1. Структуры](1.%20Languages/C-sharp/0.%20Введение/2.%20Классы%20и%20структуры/1.%20Структуры.md)

### Outer links:
