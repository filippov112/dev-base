#lang #lang-c_sharp 
# <font color="#00b0f0">C#:</font> Parallel

**Parallel** - класс параллельной обработки.

- **Разовый <font color="#ffff00">Invoke</font>**: `Invoke(params Action[] actions)`
- **<font color="#ffff00">For</font>**: `For(int firstID, int lowerThanID, Action<int>)`
- **<font color="#ffff00">Foreach</font>**: `ForEach<TSource>(IEnumerable<TSource> source,Action<TSource> body)`

Объект `ParallelLoopResult` - Результат выполнения `Parallel.ForEach` и `Parallel.For`.
Свойства:
- `IsCompleted`: завершилось ли полное выполнение параллельного цикла
- `LowestBreakIteration`: индекс, на котором произошло прерывание

```csharp
Parallel.Invoke(Print, () => {...}, () => Square(5));
 
void Print()
{}

void Square(int n)
{}
```

```csharp
Parallel.For(1, 5, Square);
 
void Square(int n)
{
}
```

```csharp
Parallel.ForEach<int>(new List<int>() { 1, 3, 5, 8 }, Square);

void Square(int n)
{
}
```

**Прерывание циклов**: Метод должен принимать объект `ParallelLoopState`. Инициируется методом `Break()` данного объекта. `Break` указывает, что итерации с номером больше данного не должны выполняться. Однако не останавливает те, которые уже начали выполняться. 
```csharp
ParallelLoopResult result = Parallel.For(1, 10, Square);

void Square(int n, ParallelLoopState pls)
{
	pls.Break();
}
```

### Outer links:
https://metanit.com/sharp/tutorial/12.4.php
https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.parallelloopstate.break?view=net-8.0
