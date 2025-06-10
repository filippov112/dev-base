
# Цепочка обязанностей

**Цепочка обязанностей (Chain of Responsibility)** — это поведенческий паттерн, который позволяет передавать запрос по цепочке обработчиков. Каждый обработчик решает, обработать ли запрос или передать дальше.

📌 Когда может понадобиться:  
- Если требуется передавать запрос по очереди нескольким обработчикам, не зная их точного списка.  
- Если обработчики должны работать независимо и не должны знать друг о друге.  
- Если нужно легко добавлять новые обработчики без изменения существующего кода.

📌 Суть паттерна:  
Обработчики объединяются в цепочку. Запрос передаётся от одного к другому, пока не будет обработан или пока не дойдёт до конца цепи.

📌 Выгода:  
✔️ Ослабляет связанность компонентов  
✔️ Позволяет легко добавлять новые обработчики  
✔️ Упрощает управление сложной логикой обработки  

---
#### Простой пример на C#:
В этом коде у нас есть обработчики `ConcreteHandlerA` и `ConcreteHandlerB`, которые могут обрабатывать запрос или передавать его дальше.

```csharp
// Интерфейс обработчика
abstract class Handler
{
    protected Handler NextHandler;

    public void SetNext(Handler next) => NextHandler = next;

    public virtual void HandleRequest(int request)
    {
        NextHandler?.HandleRequest(request);
    }
}

// Конкретный обработчик A
class ConcreteHandlerA : Handler
{
    public override void HandleRequest(int request)
    {
        if (request < 10)
            Console.WriteLine($"HandlerA обработал запрос {request}");
        else
            base.HandleRequest(request);
    }
}

// Конкретный обработчик B
class ConcreteHandlerB : Handler
{
    public override void HandleRequest(int request)
    {
        if (request >= 10 && request < 20)
            Console.WriteLine($"HandlerB обработал запрос {request}");
        else
            base.HandleRequest(request);
    }
}

// Использование
class Program
{
    static void Main()
    {
        Handler handlerA = new ConcreteHandlerA();
        Handler handlerB = new ConcreteHandlerB();

        handlerA.SetNext(handlerB); // Формируем цепочку

        int[] requests = { 5, 15, 25 };
        foreach (var request in requests)
            handlerA.HandleRequest(request);
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.7.php