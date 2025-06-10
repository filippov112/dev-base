
# Итератор

**Итератор (Iterator)** — это поведенческий паттерн, который упрощает доступ к элементам коллекции, не раскрывая её внутреннюю структуру. Он позволяет обходить коллекцию без необходимости знать, как она устроена.

📌 Когда может понадобиться:  
- Если нужна удобная навигация по сложной структуре данных.  
- Если требуется предоставить несколько способов обхода одной и той же коллекции.  
- Если нужно скрыть детали реализации коллекции от клиентского кода.

📌 Суть паттерна:  
Определяется интерфейс или класс итератора, который инкапсулирует логику обхода элементов коллекции. Клиентский код работает с итератором, не зная деталей хранения данных.

📌 Выгода:  
✔️ Упрощает код обхода коллекции  
✔️ Позволяет менять структуру коллекции без изменения кода её обхода  
✔️ Поддерживает несколько способов итерации  

---
#### Простой пример на C#:
В этом коде класс `CustomCollection` реализует собственный итератор `IEnumerator<int>`, который позволяет обходить элементы.

```csharp
using System;
using System.Collections;
using System.Collections.Generic;

// Кастомная коллекция с собственным итератором
class CustomCollection : IEnumerable<int>
{
    private int[] items = { 1, 2, 3, 4, 5 };

    public IEnumerator<int> GetEnumerator()
    {
        foreach (var item in items)
            yield return item;
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}

// Использование
class Program
{
    static void Main()
    {
        CustomCollection collection = new CustomCollection();

        foreach (var item in collection)
            Console.WriteLine(item); // 1 2 3 4 5
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.5.php