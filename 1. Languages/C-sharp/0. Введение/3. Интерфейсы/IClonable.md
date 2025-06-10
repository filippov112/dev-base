#Csharp  

# Интерфейс копирования ссылочных типов - IClonable

Предоставляет унифицированный АПИ в виде метода `Clone()`, а также метод автоматического поверхностного копирования `MemberwiseClone()`.
Глубокое копирование необходимо реализовывать вручную.

```csharp
public interface ICloneable
{
    object Clone();
}

class Person : ICloneable
{
    ...
    public object Clone()
    {
        return MemberwiseClone(); // Поверхностное копирование
    }
}

var tom = new Person("Tom", 23);
var bob = (Person)tom.Clone();
```
### Inner links:
[1. Интерфейсы](1.%20Languages/C-sharp/0.%20Введение/3.%20Интерфейсы/1.%20Интерфейсы.md)

### Outer links:



