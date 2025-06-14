#theory #theory-sys_design
 
---
**_Локатор сервисов (Service Locator)_** — это порождающий паттерн, который предоставляет глобальную точку доступа к зависимостям, скрывая детали их создания и управления.

📌 Когда может понадобиться:

- Если необходимо управлять зависимостями централизованно, не привязывая код к конкретным реализациям.
- Если внедрение зависимостей через конструкторы или параметры неудобно.
- Если нужна гибкость в управлении зависимостями во время выполнения.

📌 Суть паттерна:  
Создаётся специальный объект (локатор), который хранит зарегистрированные сервисы и предоставляет их по запросу. Компоненты обращаются к локатору за нужными зависимостями, а локатор управляет их созданием или возвратом.

📌 Выгода:  
✔️ Централизованное управление зависимостями  
✔️ Упрощает рефакторинг и замену реализаций сервисов  
✔️ Уменьшает связанность кода

---

#### Простой пример на C#

В этом коде _ServiceLocator_ управляет сервисами и предоставляет их по запросу.

```csharp
using System;
using System.Collections.Generic;

// Интерфейс сервиса
interface IService
{
    void Execute();
}

// Реализация сервиса
class MyService : IService
{
    public void Execute() => Console.WriteLine("MyService выполнен");
}

// Локатор сервисов
class ServiceLocator
{
    private static readonly Dictionary<Type, object> services = new();

    public static void Register<T>(T service) where T : class
    {
        services[typeof(T)] = service;
    }

    public static T Get<T>() where T : class
    {
        return services.TryGetValue(typeof(T), out var service) ? service as T : throw new Exception("Сервис не найден");
    }
}

// Использование
class Program
{
    static void Main()
    {
        ServiceLocator.Register<IService>(new MyService()); // Регистрация сервиса
        IService service = ServiceLocator.Get<IService>();  // Получение сервиса
        service.Execute();  // Вызов метода сервиса
    }
}
```

### Outer links:
