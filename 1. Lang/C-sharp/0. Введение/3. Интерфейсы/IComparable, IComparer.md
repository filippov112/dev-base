#lang #lang-c_sharp 

---
Большинство встроенных в .NET классов *коллекций* и *массивы* поддерживают сортировку.
Сортировку осуществляет метод `Sort()`.

```csharp
int[] numbers = new int[] { 97, 45, 32, 65, 83, 23, 15 };
Array.Sort(numbers);
foreach (int n in numbers)
    Console.WriteLine(n);
// 15 23 32 45 65 83 97
```

Чтобы пользовательские классы и структуры поддерживали сортировку этим методом необходимо:
- *1 способ:* Реализовать интерфейс `IComporable` в целевом классе.
- *2 способ:* Реализовать интерфейс `IComparer` в стороннем классе, используя его как функцию сравнения передавая в качестве параметра методу `Sort()`.

---
### IComporable

```csharp
public interface IComparable
{
    int CompareTo(object? o);
}

public interface IComparable<in T>
{
    int CompareTo(T? o);
}
```

Метод `CompareTo` предназначен для сравнения текущего объекта с объектом `object? o`. 
На выходе он возвращает целое число:
- `int < 0`. - `this` меньше `o`
- `int == 0`.  - `this` равен `o`
- `int > 0`. - `this` больше `o`

---
### IComparer

```csharp
public interface IComparer
{
    int Compare(object? x, object? y);
}

public interface IComparer<in T>
{
    int Compare(T? x, T? y);
}
```

Принцип работы метода `Compare` - тот же что и у `CompareTo`.

---
- еще есть `IEqualityComparer` - типизируется типом сравниваемых данных. Для реализации этого интерфейса необходимо определить методы `Equals` и `GetHashCode`.

```csharp
// Пример:
class CustomStringComparer : IEqualityComparer<string>
{
    public bool Equals(string? x, string? y)
    {
        if (x is null || y is null) return false;
        return x.ToLower() == y.ToLower();
 
    }
 
    public int GetHashCode(string obj) => obj.ToLower().GetHashCode();
}
```

---

### Примеры:

```csharp
class Person : IComparable<Person>
{
    public string Name { get;}
    public int Age { get; set; }
    public Person(string name, int age)
    {
        Name = name; Age = age;
    }
    public int CompareTo(Person? person)
    {
        if(person is null) throw new ArgumentException("Некорректное значение параметра");
        return Name.CompareTo(person.Name);
    }
}

var tom = new Person("Tom", 37);
var bob = new Person("Bob", 41);
var sam = new Person("Sam", 25);
 
Person[] people = { tom, bob, sam};
Array.Sort(people); // Bob, Sam, Tom
```

```csharp
class PeopleComparer : IComparer<Person>
{
    public int Compare(Person? p1, Person? p2)
    {
        if(p1 is null || p2 is null) 
            throw new ArgumentException("Некорректное значение параметра");
        return p1.Name.Length - p2.Name.Length;
    }
}
 
class Person
{
    public string Name { get;}
    public int Age { get; set; }
    public Person(string name, int age)
    {
        Name = name; Age = age;
    }
}

var alice = new Person("Alice", 41);
var tom = new Person("Tom", 37);
var kate = new Person("Kate", 25);
 
Person[] people = { alice, tom, kate};
Array.Sort(people, new PeopleComparer()); // Tom, Kate, Alice
```

### Inner links:
[1. Интерфейсы](1.%20Lang/C-sharp/0.%20Введение/3.%20Интерфейсы/1.%20Интерфейсы.md)


### Outer links:


