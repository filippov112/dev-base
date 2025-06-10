#Csharp 
# <font color="#00b0f0">C#:</font> IAsyncEnumerable

**Асинхронные стримы (C# 8.0)** - позволют получать множество значений и возвращать их по мере готовности в асинхронном режиме.

Используется в цикле `await foreach`:
```csharp
await foreach (var element in IAsyncEnumerator<T>)
```

Интерфейсы:
```csharp
public interface IAsyncEnumerable<out T>
{
    IAsyncEnumerator<T> GetAsyncEnumerator(CancellationToken cancellationToken = default);
}
```
```csharp
public interface IAsyncEnumerator<out T> : IAsyncDisposable
{
    T Current { get; }
    ValueTask<bool> MoveNextAsync();
}
```
```csharp
public interface IAsyncDisposable
{
    ValueTask DisposeAsync();
}
```

---

#### **Пример:**
```csharp
Repository repo = new Repository();
IAsyncEnumerable<string> data = repo.GetDataAsync();
await foreach (var name in data) // перед циклом нужен await
{
    //Console.WriteLine(name);
}
 
class Repository
{
    //string[] data = { "Tom", "Sam", "Kate", "Alice", "Bob" };
    
    public async IAsyncEnumerable<string> GetDataAsync()
    {
        for (int i = 0; i < data.Length; i++)
        {
            //Console.WriteLine($"Получаем {i + 1} элемент");
            
            await Task.Delay(500); 
            yield return data[i]; // yield - как в обычном итераторе
        }
    }
}
```

### Outer links:
https://metanit.com/sharp/tutorial/13.8.php