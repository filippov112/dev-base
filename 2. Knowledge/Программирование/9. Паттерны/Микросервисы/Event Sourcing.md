#microservice #micro_pattern

# Event Sourcing

***Event Sourcing*** — это способ хранения данных, где вместо текущего состояния системы сохраняется последовательность событий, которые привели к этому состоянию.

**Как?**  
Вместо того чтобы просто хранить, например, баланс счёта (`1000 рублей`), мы храним **события**, которые изменяли этот баланс:
1. Пополнение `+500 рублей`
2. Списание `-200 рублей`
3. Пополнение `+700 рублей`
Чтобы получить текущее состояние (`1000 рублей`), мы просто проигрываем все события по порядку.

**Когда?**
- Когда важна история изменений (например, финансы, аудит).
- Если данные часто обновляются и нам важно понимать, кто и как их менял.
- Когда нужно легко откатывать изменения.

**Рекомендации**
- Для поиска и фильтрации можно дополнительно хранить снапшоты (снимки состояния).
- Если событий много, используйте *Kafka, EventStoreDB* для хранения и обработки.

---
#### **Пример Event Sourcing на C#**

Рассмотрим банковский счёт, где операции (пополнение, списание) записываются в виде событий.

1. **Определяем события**
	- Мы создаём события `MoneyDeposited` и `MoneyWithdrawn`, которые фиксируют все операции.
	```csharp
		public abstract record AccountEvent(Guid AccountId, DateTime Timestamp);
		
		public record MoneyDeposited(Guid AccountId, decimal Amount, DateTime Timestamp) 
		    : AccountEvent(AccountId, Timestamp);
		
		public record MoneyWithdrawn(Guid AccountId, decimal Amount, DateTime Timestamp) 
		    : AccountEvent(AccountId, Timestamp);
	```


2. **Храним события в "журнале"**
	- Здесь не храним баланс, а только последовательность событий.
	```csharp
		public class EventStore
		{
		    private readonly List<AccountEvent> _events = new();
		
		    public void Append(AccountEvent @event)
		    {
		        _events.Add(@event);
		    }
		
		    public List<AccountEvent> GetEvents(Guid accountId)
		    {
		        return _events.Where(e => e.AccountId == accountId).ToList();
		    }
		}
	```

3. **Восстанавливаем состояние счета из событий**
	- Объект `Account` создаётся, проигрывая все события.
	```csharp
		public class Account
		{
		    public Guid Id { get; }
		    public decimal Balance { get; private set; }
		
		    public Account(Guid id, IEnumerable<AccountEvent> events)
		    {
		        Id = id;
		        foreach (var @event in events)
		        {
		            Apply(@event);
		        }
		    }
		
		    private void Apply(AccountEvent @event)
		    {
		        switch (@event)
		        {
		            case MoneyDeposited deposit:
		                Balance += deposit.Amount;
		                break;
		            case MoneyWithdrawn withdraw:
		                Balance -= withdraw.Amount;
		                break;
		        }
		    }
		}
	```

4. **Используем Event Sourcing в коде**
	- Мы восстанавливаем состояние счета, проигрывая все события.
	```csharp
		var eventStore = new EventStore();
		var accountId = Guid.NewGuid();
		
		// Записываем события
		eventStore.Append(new MoneyDeposited(accountId, 500, DateTime.UtcNow));
		eventStore.Append(new MoneyWithdrawn(accountId, 200, DateTime.UtcNow));
		eventStore.Append(new MoneyDeposited(accountId, 700, DateTime.UtcNow));
		
		// Восстанавливаем состояние
		var events = eventStore.GetEvents(accountId);
		var account = new Account(accountId, events);
		
		Console.WriteLine($"Баланс аккаунта: {account.Balance} рублей"); // Выведет: 1000 рублей
	```

### Outer links:

