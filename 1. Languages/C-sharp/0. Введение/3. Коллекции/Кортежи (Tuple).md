#lang #lang-c_sharp

---
**Кортежи** (C# 7.0) - набор значений, заключенных в `()` .
Обращение к элементам по умолчанию происходит по свойствам типа `Item[порядковый_номер_поля_в_кортеже]`, но можно задавать имена явно.
- Поддерживают *декомпозицию* - когда при объявлении кортежа создаются дополнительно переменные с каждым его элементом в отдельности.
- Поддерживают *создание группировкой* - когда инициализация кортежа происходит путем группировки уже существующих элементов (что часто используется для быстрого обмена значениями переменных `(a, b) = (b, a)`)

> Не смотря на схожесть с *анонимными типами* - **элементы независимы от кортежа**, что является признаком *коллекции*.

```csharp
// Примеры объявления:

var tuple = (5, 10);
Console.WriteLine(tuple.Item1); // 5
Console.WriteLine(tuple.Item2); // 10

(string, int, double) person = ("Tom", 25, 81.23);

var tuple = (count:5, sum:10);
Console.WriteLine(tuple.count); // 5
Console.WriteLine(tuple.sum); // 10

// Декомпозиция:

var (name, age) = ("Tom", 23);
Console.WriteLine(name);    // Tom
Console.WriteLine(age);     // 23

// Создание группировкой и обмен:

string main = "Java";
string second = "C#";
(main, second) = (second, main);
Console.WriteLine(main);    // C#
Console.WriteLine(second);  // Java

// С методами:

var tuple = GetValues();
Console.WriteLine(tuple.Item1); // 1
Console.WriteLine(tuple.Item2); // 3
 
(int, int) GetValues()
{
    var result = (1, 3);
    return result;
}



PrintPerson(("Tom", 37));   // Tom - 37
PrintPerson(("Bob", 41));   // Bob - 41

void PrintPerson((string name, int age) person)
{
    Console.WriteLine($"{person.name} - {person.age}");
}

```


### Inner links:
[Анонимные типы](1.%20Languages/C-sharp/0.%20Введение/_Особые%20типы/Анонимные%20типы.md)
[1. Коллекции](1.%20Languages/C-sharp/0.%20Введение/3.%20Коллекции/1.%20Коллекции.md)

### Outer links:
