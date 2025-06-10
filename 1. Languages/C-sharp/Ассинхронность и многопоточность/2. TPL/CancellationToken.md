#Csharp 
# <font color="#00b0f0">C#:</font> CancellationToken

**CancellationToken** - структура прерывания задач. 
Пространство - `System.Threading`.

### Алгоритм отмены

1. **Создание источника токена** - `CancellationTokenSource`, который управляет и посылает уведомление об отмене токену.
<br>
2. **Получение токена** - С помощью свойства `CancellationTokenSource.Token` получаем собственно токен - объект структуры `CancellationToken` и передаем его в задачу, которая может быть отменена.
<br>
3. Определяем в задаче действия на случай ее отмены. 2 варианта:
	<br>
	- **Обычное завершение работы:** При получении сигнала отмены выйти из метода задачи, например, с помощью оператора `return` или построив логику метода соответствующим образом. Но следует учитывать, что в этом случае задача перейдет в состояние `TaskStatus.RanToCompletion`, а не в состояние `TaskStatus.Canceled`.
	<br>
	- **Генерация исключения:** При получении сигнала отмены сгенерировать исключение `OperationCanceledException`, вызвав у токена метод `ThrowIfCancellationRequested()`. После этого задача перейдет в состояние `TaskStatus.Canceled`. <font color="#ff0000">Исключение же сработает только если главный поток будет ожидать данную задачу.</font>
	<br>
5. **Инициализация отмены** - Вызываем метод `CancellationTokenSource.Cancel()`, который устанавливает для свойства `CancellationToken.IsCancellationRequested` значение `true`. Данный метод не отменяет задачу, он лишь посылает *уведомление об отмене*. 
<br>    
5. **Освобождение ресурсов** - Класс `CancellationTokenSource` реализует интерфейс `IDisposable`. И когда работа с объектом `CancellationTokenSource` завершена, у него следует вызвать метод `Dispose` для освобождения всех связанных с ним используемых ресурсов. (Вместо явного вызова метода `Dispose` можно использовать конструкцию `using`).

```csharp
CancellationTokenSource cancelTokenSource = new CancellationTokenSource(); // # 1
CancellationToken token = cancelTokenSource.Token; // # 2
 
Task task = new Task(() =>
{
    for (int i = 1; i < 10; i++)
    {
        if (token.IsCancellationRequested)
            token.ThrowIfCancellationRequested(); // # 3 генерируем исключение
            // return; # 3 вариант с завершением работы
 
        Console.WriteLine($"Квадрат числа {i} равен {i * i}");
        Thread.Sleep(200);
    }
}, token);
try
{
    task.Start();
    Thread.Sleep(1000);
    cancelTokenSource.Cancel(); // # 4
    task.Wait(); // ожидаем завершения задачи, иначе не получим исключение
}
catch (AggregateException ae)
{
    foreach (Exception e in ae.InnerExceptions)
    {
        if (e is TaskCanceledException) // <-- Исключение отмены задачи
            Console.WriteLine("Операция прервана");
        else
            Console.WriteLine(e.Message);
    }
}
finally
{
    cancelTokenSource.Dispose(); // # 5
}
 
//  проверяем статус задачи
Console.WriteLine($"Task Status: {task.Status}"); // Canceled
```

### Обработчик исключения отмены

Метод `Register()` позволяет зарегистрировать обработчик отмены задачи в виде делегата `Action`:

```csharp
...
Task task = new Task(() =>
{
    ...
    token.Register(() => // устанавливаем лямбда-функцию обработчик события Cancel
    { 
        ...
    });
    ...
}, token);
...
cancelTokenSource.Cancel(); // триггерим событие
```

### Отмена параллельных операций Parallel

Для отмены выполнения параллельных операций, запущенных с помощью методов `Parallel.For()` и `Parallel.ForEach()`, можно использовать перегруженные версии данных методов, которые принимают в качестве параметра объект `ParallelOptions`. 
Данный объект позволяет установить токен:
- В этом случае следить за токеном не нужно, цикл будет отслеживать событие отмены.

```csharp
Parallel.ForEach<int>(
	new List<int>() { ... },
	new ParallelOptions { CancellationToken = token }, 
	() => { ... }
);
// или так
//Parallel.For(1, 5, new ParallelOptions { CancellationToken = token }, Square);
...
cancelTokenSource.Cancel();
```

### Outer links:
https://metanit.com/sharp/tutorial/12.5.php