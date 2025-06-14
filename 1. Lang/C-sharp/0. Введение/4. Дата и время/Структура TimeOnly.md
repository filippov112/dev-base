#lang #lang-c_sharp 

---
Структура `TimeOnly` представляет время в диапазоне от 00:00:00 до 23:59:59.9999999.

```csharp
TimeOnly time = new TimeOnly() // 0:00
TimeOnly time = new TimeOnly(long ticks)
TimeOnly time = new TimeOnly(int hour, int minute)
TimeOnly time = new TimeOnly(int hour, int minute, int second)
TimeOnly time = new TimeOnly(int hour, int minute, int second, int millisecond)


```

**Свойства:**
- `Hour` - возвращает количество часов
- `Minute` - возвращает количество минут
- `Second` - возвращает количество секунд
- `Millisecond` - возвращает количество миллисекунд
- `Ticks` - возвращает количество тиков
- `MaxValue` - возвращает максимально возможное время (статическое свойство)
- `MinValue` - возвращает минимально возможное время (статическое свойство)

**Методы:**
- `AddHours(double hours)` - добавляет к времени некоторое количество часов
- `AddMinutes(double minutes)` - добавляет к времени некоторое количество минут
- `Add(TimeSpan value)` - добавляет время из объекта TimeSpan
- `ToLongTimeString()` - выводит текущий объект TimeOnly в виде подробного времени
- `ToShortTimeString()` - выводит текущий объект TimeOnly в виде сжатого времени

**Статические:**
- `FromDateTime(DateTime dateTime)` - на основе значения DateTime, переданного через параметр, создает и возвращает объект TimeOnly
- `FromTimeSpan(TimeSpan value)` - на основе объекта TimeSpan создает и возвращает объект TimeOnly
- `Parse(string time)` - конвертирует строковое представление времени в объект TimeOnly
- `ParseExact(string timee, string format)` - конвертирует строковое представление времени в объект TimeOnly, применяя определенный формат
- `TryParse(string time, TimeOnly result)` - конвертирует строковое представление времени в объект TimeOnly. При успешной конвертации возвращает true, а параметр типа TimeOnly содержит сконвертированное время
- `TryParseExact(string time, string format, TimeOnly result)` - конвертирует строковое представление времени в объект TimeOnly, применяя определенный формат. При успешной конвертации возвращает true, а параметр типа TimeOnly содержит сконвертированное время

### Inner links:
[1. Стурктура DateTime](1.%20Lang/C-sharp/0.%20Введение/4.%20Дата%20и%20время/1.%20Стурктура%20DateTime.md)

### Outer links: