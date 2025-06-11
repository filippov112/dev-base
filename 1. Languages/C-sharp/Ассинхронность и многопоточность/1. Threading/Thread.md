#lang #lang-c_sharp 

---
С его помощью можно запускать методы в отдельных потоках, устанавливать приоритеты и отслеживать состояние потоков.

#### **Методы:**
- `Thread.GetDomain()` - домен приложения
- `Thread.GetDomainID()` - id домена приложения
- `Thread.Sleep(int value)` - останавливает поток на `value` миллисекунд
- `Interrupt()` - прерывает поток (состояние `WaitSleepJoin`)
- `Join()` - ожидание потока (блокирует вызывающий поток, пока не завершится вызываемый поток)
- `Start()` - запускает поток

#### **Свойства:**
- `Thread.CurrentThread` - текущий поток.
- `ExecutionContext`: контекст потока
- `IsAlive`: работает поток / нет
- `IsBackground`: фоновый / нет
- `Name`: имя потока (по ум. пустая строка)
- `ManagedThreadId`: ID потока
- `Priority` - приоритет потока ( `ThreadPriority`: `Lowest`, `BelowNormal`, `Normal` (по ум.), `AboveNormal`, `Highest`)

```csharp
using System.Threading;

Thread myThread1 = new Thread(() => {});
Thread myThread2 = new Thread((object? param) => {});

myThread1.Start();
myThread2.Start("Hello");
```

### Outer links:
https://metanit.com/sharp/tutorial/11.1.php
https://metanit.com/sharp/tutorial/11.2.php
https://metanit.com/sharp/tutorial/11.3.php