#Csharp 
# <font color="#00b0f0">C#:</font> 1. Async - await

Механизм написания ассинхронных методов.
Применяется для **внешних операций**, таких как ввод/вывод, сетевые запросы, запросы к БД, или многопоточность.

- `void`/`Task`/`Task<T>`/`ValueTask<T>` - допустимые типы.
	<br>
- **`async` - модификатор заголовка** - указывает на возможность использования `await`.
	<br>
- **`await` выражение(-я)** - переключает контекст выполнения потока на уровень выше (если же это верхний уровень, то поток переходит в ожидание) до момента завершения ожидания, после чего происходит обратное переключение контекста.

<font color="#ffff00">Когда какой тип использовать?</font>
1. `Void` - обработка событий
	- не допускают `await`. 
	- обработка исключений только внутри.
2. `Task` - операции, требующие контроля (`await`).
3. `Task<T>` - операции с возвратом результата. (`T result = await task;`)
4. `ValueTask<T>` - если ассинхронность метода неочевидна (`await` с условиями).
	- можно вернуть задачу через `.AsTask()`.

#### **Правила**
- Не допускаются параметры с модификаторами `out`, `ref` и `in`.
- (Рекомендация) использовать постффикс `Async` в названии.

```csharp
static Task Main()
{
    MyMethod(); // 1
    Console.WriteLine("После MyMethod"); // 3
}

static async Task MyMethod()
{
	Console.WriteLine("Начало MyMethod"); // 2
    await Task.Delay(3000); // В другом потоке - Многопоточность только в качестве примера внешней операции
    Console.WriteLine("Выполнение MyMethod"); // 4
}
```

### Outer links:
https://metanit.com/sharp/tutorial/13.3.php
https://metanit.com/sharp/tutorial/13.7.php
https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.valuetask-1?view=net-8.0