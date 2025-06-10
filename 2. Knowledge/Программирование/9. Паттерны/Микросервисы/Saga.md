#microservice #micro_pattern

# Saga

**Saga** — это способ выполнять распределённые транзакции в микросервисах, когда нельзя использовать классические транзакции базы данных.
Два подхода к Saga:
1. **Choreography (Хореография)** — сервисы сами управляют своими действиями, отправляя события.
2. **Orchestration (Оркестрация)** — специальный **Saga-менеджер** управляет процессом.

**Как?**  
Представь, что ты покупаешь билет на самолёт:
1. Бронь билета.
2. Списание денег.
3. Отправка билета на почту.
Если на шаге 2 произошла ошибка, то шаг 1 должен **откатиться** (отмена брони). Saga как раз управляет такими последовательными действиями и их отменой.

**Когда?**
- Если операция затрагивает несколько микросервисов и должна быть атомарной.
- Когда классические транзакции (ACID) невозможны из-за разных баз данных или сервисов.
- Если система должна оставаться устойчивой, даже если один из шагов не удался.
- Если операции могут завершиться неудачно, и нужен откат.
- Выбирайте подход:
    - Хореография → если мало шагов и событий.
    - Оркестрация → если процесс сложный и нужен контроль.

**Рекомендации**
- Комбинируйте с **Message Broker** (RabbitMQ, Kafka) для управления сообщениями.

---

### **Пример Saga в C# (Оркестрация) с MassTransit**

1. Клиент отправляет `OrderCreated`.
2. Saga ждёт `PaymentProcessed` или `OrderCancelled`.
3. Если оплата прошла → заказ подтверждается.
4. Если что-то пошло не так → заказ отменяется.

[MassTransit](https://masstransit.io/) — популярная библиотека для управления сообщениями в микросервисах, поддерживает Saga.
```sh
dotnet add package MassTransit.AspNetCore
dotnet add package MassTransit.RabbitMQ
```

**Определяем события**
Каждый этап Saga будет представлять собой команду.
```csharp
public record OrderCreated(Guid OrderId, decimal Amount);
public record PaymentProcessed(Guid OrderId);
public record OrderCancelled(Guid OrderId);
```

**Реализуем Saga-менеджер**
```csharp
using MassTransit;
using System;
using System.Threading.Tasks;

public class OrderSaga : MassTransitStateMachine<OrderState>
{
    public State Processing { get; private set; }

    public Event<OrderCreated> OrderCreatedEvent { get; private set; }
    public Event<PaymentProcessed> PaymentProcessedEvent { get; private set; }
    public Event<OrderCancelled> OrderCancelledEvent { get; private set; }

    public OrderSaga()
    {
        InstanceState(x => x.CurrentState);

        Event(() => OrderCreatedEvent, x => x.CorrelateById(m => m.Message.OrderId));
        Event(() => PaymentProcessedEvent, x => x.CorrelateById(m => m.Message.OrderId));
        Event(() => OrderCancelledEvent, x => x.CorrelateById(m => m.Message.OrderId));

        Initially(
            When(OrderCreatedEvent)
                .Then(context => Console.WriteLine($"Заказ {context.Data.OrderId} создан, ожидаем оплату"))
                .TransitionTo(Processing));

        During(Processing,
            When(PaymentProcessedEvent)
                .Then(context => Console.WriteLine($"Оплата получена для заказа {context.Data.OrderId}"))
                .Finalize(),
            When(OrderCancelledEvent)
                .Then(context => Console.WriteLine($"Заказ {context.Data.OrderId} отменён"))
                .Finalize());

        SetCompletedWhenFinalized();
    }
}
```

**Определяем состояние заказа**
```csharp
using MassTransit;
using System;

public class OrderState : SagaStateMachineInstance
{
    public Guid CorrelationId { get; set; }
    public string CurrentState { get; set; }
}
```

**Конфигурируем MassTransit в `Program.cs`**
```csharp
using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMassTransit(x =>
{
    x.AddSagaStateMachine<OrderSaga, OrderState>()
        .InMemoryRepository();
    
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("rabbitmq://localhost");
        cfg.ConfigureEndpoints(context);
    });
});

var app = builder.Build();
app.Run();
```

### Outer links:

