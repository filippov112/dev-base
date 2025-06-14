#lang #lang-c_sharp 

---
```csharp
DateOnly someDate = new DateOnly() // 01.01.0001
DateOnly someDate = new DateOnly(int year, int month, int day)
DateOnly someDate = new DateOnly(int year, int month, int day, System.Globalization.Calendar calendar)

DateOnly now = new DateOnly(2022,1,6);
//- `MaxValue` - возвращает максимально возможную дату (статическое свойство)  
//- `MinValue` - возвращает самую раннюю возможную дату (статическое свойство)
Console.WriteLine(now.Day);         // 6
Console.WriteLine(now.DayNumber);   // 738160
Console.WriteLine(now.DayOfWeek);   // Thursday
Console.WriteLine(now.DayOfYear);   // 6
Console.WriteLine(now.Month);       // 1
Console.WriteLine(now.Year);        // 2022
```

**Свойства:**
- `Day` - возвращает день даты
- `DayNumber` - возвращает количество прошедших дней с 1 января 0001 года относительно григорианского календаря
- `DayOfWeek` - возвращает день недели
- `DayOfYear` - возвращает день года
- `MaxValue` - возвращает максимально возможную дату (статическое свойство)
- `MinValue` - возвращает самую раннюю возможную дату (статическое свойство)
- `Month` - возвращает месяц
- `Year` - возвращает год

**Методы:**
- `AddDays(int days)` - добавляет к дате некоторое количество дней
- `AddMonths(int months)` - добавляет к дате некоторое количество месяцев
- `AddYears(int years)` - добавляет к дате некоторое количество лет
- `ToDateTime(TimeOnly)` - возвращает объект `DateTime`, который в качестве даты исппользует текущий объект DateOnly, а в качестве времени - `значение параметра в виде TimeOnly
- `ToLongDateString()` - выводит текущий объект DateOnly в виде подробной даты
- `ToShortDateString()` - выводит текущий объект DateOnly в виде сжатой даты

**Статические:**
- `FromDateTime(DateTime dateTime)` - на основе значения DateTime, переданного через параметр, создает и возвращает объект DateOnly
- `FromDayNumber(int days)` - на основе количества дней создает и возвращает объект DateOnly
- `Parse(string date)` - конвертирует строковое представление даты в объект DateOnly
- `ParseExact(string date, string format)` - конвертирует строковое представление даты в объект DateOnly, применяя определенный формат
- `TryParse(String, DateOnly)` - конвертирует строковое представление даты в объект DateOnly. При успешной конвертации возвращает true, а параметр типа DateOnly содержит созданную дату
- `TryParseExact(String, String, DateOnly)` - конвертирует строковое представление даты в объект DateOnly, применяя определенный формат. При успешной конвертации возвращает true, а параметр типа DateOnly содержит созданную дату

### Inner links:
[1. Стурктура DateTime](1.%20Lang/C-sharp/0.%20Введение/4.%20Дата%20и%20время/1.%20Стурктура%20DateTime.md)

### Outer links: