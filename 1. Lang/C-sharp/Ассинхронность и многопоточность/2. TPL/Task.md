#lang #lang-c_sharp 

---
Класс `Task` - описывает отдельную задачу, которая запускается асинхронно в одном из потоков [ThreadPool](1.%20Lang/C-sharp/Ассинхронность%20и%20многопоточность/2.%20TPL/ThreadPool.md). 

- `task.Wait()` - ожидание завершения задачи
- `task.RunSynchronously()` - синхронный запуск в том же потоке
- `Task.WaitAll(Task[] tasks)` - ожидание завершения всех задач массива.
- `Task.WaitAny(Task[] tasks)` - ожидание завершения любой задачи массива.

```csharp
// 1
Task task = new Task( Action action );
task.Start();
// 2
Task task = Task.Factory.StartNew( Action action ); // сразу запускает
// 3
Task task = Task.Run(() => Console.WriteLine("Hello Task!"));
```

- **Вложенные задачи**: Задачи можно вкладывать друг в друга. `TaskCreationOptions.AttachedToParent` - позволяет связывать завершение задачи-родителя с завершением задачи-потомка.
	```csharp
	var outer = Task.Factory.StartNew(() =>      // внешняя задача
	{
	    var inner = Task.Factory.StartNew(() =>  // вложенная задача
	    {
		    //...
	    }, TaskCreationOptions.AttachedToParent); 
	});
	outer.Wait(); // ожидаем выполнения внешней задачи
	```

- **Возврат результата**: `Task<T>` - типизированные задачи нужны для вовзращения результата. За хранение отвечает свойстве `Result`, которое включает в себя логику `task.Wait()`.
	```csharp
	Task<int> t = new Task<int>(() => Sum(4, 5));
	t.Start();
	 
	int result = t.Result;
	 
	int Sum(int a, int b) => a + b;
	```

### Outer links:
https://metanit.com/sharp/tutorial/12.1.php
https://metanit.com/sharp/tutorial/12.2.php