#lang #lang-c_sharp 

---
**Перечисление** (enum) в C# – набор именованных констант. 
Если в константах перечисления предполагается хранить значения, то их тип обязательно должен представлять **целочисленный тип** (`byte, sbyte, short, ushort, int, uint, long, ulong`). 
Если тип явным образом не указан, то по умолчанию используется тип `int`.

**Применение:**
- *Представление наборов взаимоисключающих значений*: дни недели, цвета, размеры шрифта.
- *Определение констант*: коды ошибок, статусы операций.
- *Читаемость кода*: вместо использования магических чисел.

```csharp
public enum SomeRootVegetable
{
    HorseRadish,
    Radish,
    Turnip
}

var turnip = SomeRootVegetable.Turnip;
SomeRootVegetable turnip1 = SomeRootVegetable.Turnip;


[Flags]
public enum Seasons
{
	None = 0,
	Summer = 1,
	Autumn = 2,
	Winter = 4,
	Spring = 8,
	All = Summer | Autumn | Winter | Spring  // сочетания флагов как вариант использования
}


enum DayTime
{
    Morning = 3,    // каждый следующий элемент по умолчанию увеличивается на единицу
    Afternoon,      // этот элемент равен 4
    Evening,        // 5
    Night           // 6
}

var spring = Seasons.Spring;
var startingOnEquinox = Seasons.Spring | Seasons.Autumn;
var theYear = Seasons.All;
```
