#lang #lang-c_sharp 
# <font color="#00b0f0">C#:</font> Mutex

**<font color="#ffff00">Мьютекс (Mutex)</font>** — примитив синхронизации, обеспечивающий **взаимное исключение** для потоков или процессов. Он позволяет **только одному потоку** владеть ресурсом в определенный момент.

<font color="#ffff00">Когда использовать:</font>
- Когда нужен **междупроцессный** (кросс-процессный) доступ к ресурсу.
- Когда требуется **гарантированная эксклюзивность** владения ресурсом.

<font color="#ffff00">Преимущества:</font>
- В отличие от `lock` и `Monitor`, может использоваться **между процессами**.
- В отличие от `Semaphore`, допускает **только одного владельца** одновременно.
- Поддерживает механизм **владения и освобождения**, предотвращая повторные захваты (`WaitOne()` / `ReleaseMutex()`).

<font color="#ffff00">Недостатки:</font>
- Производительность ниже, чем у `lock`, из-за взаимодействия с ядром ОС.
- Может привести к **взаимоблокировке (deadlock)** при неправильном использовании.

---
### Практика:

**Методы:**
- `WaitOne()` - встать в очередь на получение мьютекса
- `ReleaseMutex()` - освободить мьютекс

```csharp
static Mutex mutex = new Mutex();

//for (int i = 0; i < 3; i++)
//{
//	new Thread(UseResource).Start();
//}

//static void UseResource()
//{
	mutex.WaitOne(); // Ожидание, Блокировка
	// ...
	mutex.ReleaseMutex(); // Освобождение
//}
```

1. **Использование `Mutex` между процессами** - При передаче имени `Mutex` становится **глобальным**.
	```csharp
	Mutex mutex = new Mutex(false, "GlobalMutexName");
	
	if (!mutex.WaitOne(5000)) // Ожидание 5 секунд
	{
	    //Console.WriteLine("Ресурс уже занят");
	}
	else
	{
	    //Console.WriteLine("Получен доступ к ресурсу");
	    //Thread.Sleep(3000);
	    mutex.ReleaseMutex();
	}
	```

2. **Обработка исключений и использование `using` / `try-finally`**
	```csharp
	try
	{
	    mutex.WaitOne();
	    // Код, требующий синхронизации
	}
	finally
	{
	    mutex.ReleaseMutex();
	}
	```

3. **Проверка наличия `Mutex` (чтобы не создавать дубликаты)**
	```csharp
	Mutex mutex = new Mutex(true, "UniqueAppMutex", out createdNew);
	
	if (!createdNew)
	{
	    //Console.WriteLine("Приложение уже запущено!");
	    //return;
	}
	```

### Outer links:
https://metanit.com/sharp/tutorial/11.7.php