#lang #lang-c_sharp 
# <font color="#00b0f0">C#:</font> DLR, dynamic

> В языках со статической типизацией выявление всех типов и их членов происходит на этапе *компиляции*. 
> А в динамических языках системе ничего не известно о них вплоть до *выполнения*.

**<font color="#ffff00">DLR (Dynamic Language Runtime)</font>** (.NET 4.0) - среда выполнения динамических языков.
Пространство имен `System.Dynamic`.

Позволяет создавать **<font color="#ffff00">динамические объекты</font>**:
- `dynamic` - ключевое слово (тип) - отменяет проверку типа при компиляции. 
- могут менять тип по ходу программы.

```csharp
dynamic obj = 3;            // здесь obj - целочисленное int
obj = "Hello world";        // obj - строка
obj = new Person("Tom", 37); // obj - объект Person
```

Другие темы:
[DynamicObject, ExpandoObject](1.%20Languages/C-sharp/DLR/DynamicObject,%20ExpandoObject.md) - динамические классы
[IronPython](1.%20Languages/C-sharp/DLR/IronPython.md) - работа с python-кодом

### Outer links:
https://metanit.com/sharp/tutorial/9.1.php