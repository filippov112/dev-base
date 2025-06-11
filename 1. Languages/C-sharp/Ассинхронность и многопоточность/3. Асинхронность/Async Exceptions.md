#lang #lang-c_sharp 

---
<font color="#ffff00">Способ №1: Снаружи</font> - Вызов `await` оборачивается в `try`.
- Таска прерывается, главный поток обрабатывает исключение и продолжает работу.
- При типе `void`, исключение во вне не передается!

<font color="#ffff00">Сбособ №2: Внутри</font> - Часть внутреннего кода async-метода оборачивается в `try`.
- Таска продолжает работу после обработки исключения.

---
#### Примеры:
```csharp
var task = PrintAsync("Hi"); // какой-то асс-метод
try
{
    await task;
}
catch
{
    Console.WriteLine(task.Exception?.InnerException?.Message); // Invalid string length: 2
    Console.WriteLine($"IsFaulted: {task.IsFaulted}");  // IsFaulted: True
    Console.WriteLine($"Status: {task.Status}");        // Status: Faulted
}
```

Обработка исключений списка задач `Task.WhenAll` 
```csharp
var allTasks = Task.WhenAll(task1, task2); // ожидаем завершения предварительно запущенных задач

try
{
    await allTasks;
}
catch (Exception ex)
{
    //Console.WriteLine($"Exception: {ex.Message}");
    //Console.WriteLine($"IsFaulted: {allTasks.IsFaulted}");
    if(allTasks.Exception is not null)
    {
        foreach (var exception in allTasks.Exception.InnerExceptions)
        {
            //Console.WriteLine($"InnerException: {exception.Message}");
        }
    }
}
```

### Outer links:
https://metanit.com/sharp/tutorial/13.4.php