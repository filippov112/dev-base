#lang #lang-c_sharp 
# <font color="#00b0f0">C#:</font> Continuation tasks

**Задачи продолжения (continuation task)** - средство связывания задач в цепочки выполнения.

- Метод `ContinueWith` в качестве параметра принимает делегат `Action<Task>`, где `Task` - ссылка на предыдущую задачу.
- Старт задач продолжений происходит автоматически.

```csharp
Task task1 = new Task(() =>
{
    Console.WriteLine($"Id задачи: {Task.CurrentId}");
});
 
// задача продолжения - task2 выполняется после task1
Task task2 = task1.ContinueWith(PrintTask);
 
task1.Start();
task2.Wait();
 
void PrintTask(Task t)
{
    Console.WriteLine($"Id задачи: {Task.CurrentId}");
    Console.WriteLine($"Id предыдущей задачи: {t.Id}");
    Thread.Sleep(3000);
}
```

### Outer links:
https://metanit.com/sharp/tutorial/12.3.php