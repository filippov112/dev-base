#lang #lang-c_sharp 

---
Аналоги WaitAny, WaitAll [Task](1.%20Languages/C-sharp/Ассинхронность%20и%20многопоточность/2.%20TPL/Task.md), но с поддержкой `await`. 

`Task.WhenAny()` - дожидается выполнения любой из задач из массива.
`Task.WhenAll()` - дожидается выполнения всех задач из массива.

```csharp
var task1 = SquareAsync(4);
var task2 = SquareAsync(5);
var task3 = SquareAsync(6);
 
// ожидаем завершения всех задач
int[] results = await Task.WhenAll<int>(task1, task2, task3);
// получаем результаты:
foreach (int result in results)
    Console.WriteLine(result);
 
async Task<int> SquareAsync(int n)
{
    await Task.Delay(1000);
    return n * n;
}
```

### Outer links:
https://metanit.com/sharp/tutorial/13.5.php
https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenall?view=net-8.0