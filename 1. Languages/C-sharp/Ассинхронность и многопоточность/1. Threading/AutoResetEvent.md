#Csharp 
# <font color="#00b0f0">C#:</font> AutoResetEvent

Механизм синхронизации в C#, используемый для управления доступом потоков к ресурсам.

Работает как флаг (событие), который потоки могут ожидать (`WaitOne()`) или устанавливать (`Set()`). После установки (`Set()`) событие автоматически сбрасывается в `false`, разрешая только одному ожидающему потоку продолжить выполнение.

**Методы:**
- `Reset()` - вручную переводит событие в несигнальное состояние.
- `Set()` - разрешает одному ожидающему потоку продолжить выполнение и автоматически сбрасывает событие.
- `WaitOne()` - блокирует поток, пока событие не будет установлено.
	<br>
- `AutoResetEvent.WaitAll(AutoResetEvent[] whs)` - ждать все события.
- `AutoResetEvent.WaitAny(AutoResetEvent[] whs)` - ждать любое из событий.

```csharp
AutoResetEvent waitHandler = new AutoResetEvent(true); // параметр - начальное состояние
```

---
### Пример

1. Поток `Worker()` ждет сигнал (`WaitOne()`).
2. Через 2 секунды в `Main()` вызывается `Set()`, и поток `Worker()` продолжает выполнение.
3. `AutoResetEvent` автоматически сбрасывается в несигнальное состояние после пропуска одного потока.

```csharp
using System.Threading;

class Program
{
    static AutoResetEvent autoResetEvent = new AutoResetEvent(false);

    static void Worker()
    {
        //Console.WriteLine("Поток ожидает...");
        autoResetEvent.WaitOne();  // Ожидание сигнала
        //Console.WriteLine("Поток продолжил выполнение.");
    }

    static void Main()
    {
        //Thread thread = new Thread(Worker);
        //thread.Start();

        //Thread.Sleep(2000); // Имитация задержки
        //Console.WriteLine("Разрешаем выполнение потока.");
        autoResetEvent.Set(); // Разрешение потока

        //thread.Join();
        //Console.WriteLine("Главный поток завершен.");
    }
}

```

### Outer links:
https://metanit.com/sharp/tutorial/11.6.php