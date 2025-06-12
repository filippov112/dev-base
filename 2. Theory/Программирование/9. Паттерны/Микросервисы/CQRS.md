#theory #theory-dev
 
---
***CQRS (Command Query Responsibility Segregation)*** — это разделение команд (изменение данных) и запросов (чтение данных) на разные модели.

**Как?**  
В обычных системах одна модель (например, `User`) отвечает и за чтение, и за запись. 
В CQRS мы делим систему:
- Команды (Commands) → изменяют данные (добавить пользователя, обновить заказ).
- Запросы (Queries) → только читают данные (получить список заказов).

**Когда?**
- Если у тебя нагруженная система, где чтение и запись должны работать независимо.
- Если нагрузка на чтение выше, чем на запись.
- Когда запросы сильно отличаются от команд (например, сложные отчёты).
- Если нужно масштабировать отдельно чтение и запись.

**Рекомендации**
- В простых системах может усложнить архитектуру, поэтому его лучше применять, когда это оправдано.
- В больших системах часто сочетается с Event Sourcing для гибкого хранения данных.

---

#### **Пример CQRS на C#**

Рассмотрим приложение по управлению заказами.

1. **Определяем модель**
	- Обычная модель заказа.
	```csharp
		public class Order
		{
		    public Guid Id { get; set; }
		    public string Product { get; set; }
		    public int Quantity { get; set; }
		}
	```

2. **Разделяем команды (Commands) и запросы (Queries)**
	- Команда (Command) — создание заказа
	```csharp
		public record CreateOrderCommand(string Product, int Quantity);
	```
	- Запрос (Query) — получение заказа
	```csharp
		public record GetOrderQuery(Guid OrderId);
	```

3. **Обрабатываем команды и запросы через Handlers**
	- Обработчик **команды** (Command Handler) - Добавляет заказ в список (в реальной жизни — в базу данных).
	```csharp
		using System.Collections.Generic;
		using System.Threading.Tasks;
		
		public class OrderCommandHandler
		{
		    private readonly List<Order> _orders = new();
		
		    public Task<Guid> Handle(CreateOrderCommand command)
		    {
		        var order = new Order { Id = Guid.NewGuid(), Product = command.Product, Quantity = command.Quantity };
		        _orders.Add(order);
		        return Task.FromResult(order.Id);
		    }
		}
	```
	- Обработчик **запроса** (Query Handler) - Находит заказ по ID (не изменяет данные).
	```csharp
		using System.Linq;
		
		public class OrderQueryHandler
		{
		    private readonly List<Order> _orders;
		
		    public OrderQueryHandler(List<Order> orders)
		    {
		        _orders = orders;
		    }
		
		    public Task<Order?> Handle(GetOrderQuery query)
		    {
		        return Task.FromResult(_orders.FirstOrDefault(o => o.Id == query.OrderId));
		    }
		}
	```

4. **Используем CQRS в коде**
	- Команды и запросы работают независимо.
	```csharp
		var commandHandler = new OrderCommandHandler();
		var queryHandler = new OrderQueryHandler(new List<Order>());
		
		// Создаём заказ (Command)
		var orderId = await commandHandler.Handle(new CreateOrderCommand("Laptop", 1));
		Console.WriteLine($"Заказ создан: {orderId}");
		
		// Получаем заказ (Query)
		var order = await queryHandler.Handle(new GetOrderQuery(orderId));
		Console.WriteLine($"Найден заказ: {order?.Product}, Количество: {order?.Quantity}");
	```

### Outer links:

