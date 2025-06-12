#theory #theory-dev
 
---
**Sidecar** — это способ запускать дополнительный сервис рядом с основным, чтобы расширить его возможности без изменения кода.

**Как?**
В микросервисах Sidecar — это отдельный контейнер, который работает рядом с основным сервисом и помогает ему, например:
- Собирать логи
- Кэшировать данные
- Шифровать трафик
- Проксировать запросы

**Когда?**
- Когда нужно добавить функциональность, не изменяя код основного сервиса.
- Если требуется единая инфраструктура для нескольких сервисов (например, логирование, мониторинг, безопасность).
- Когда удобно разрабатывать и обновлять вспомогательный сервис отдельно.

**Рекомендации**
- Хорошо работает в Kubernetes (например, для сервис-мешей типа Istio).


---

#### **Пример Sidecar на C#**

Допустим, у нас есть основной сервис (Web API) и Sidecar-сервис для логирования.

**1. Основной сервис (Web API)**
Создаём простой API, который принимает запрос и логирует его через Sidecar.
Основной сервис отправляет лог в **Sidecar-сервис**.
```csharp
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

[ApiController]
[Route("api/orders")]
public class OrderController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public OrderController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] Order order)
    {
        // Отправляем лог в Sidecar-сервис
        var logMessage = JsonSerializer.Serialize(new { Message = "Заказ создан", OrderId = order.Id });
        var content = new StringContent(logMessage, Encoding.UTF8, "application/json");
        await _httpClient.PostAsync("http://localhost:5001/log", content);

        return Ok(new { Message = "Order created", OrderId = order.Id });
    }
}

public record Order(Guid Id, string Product, int Quantity);
```

**2. Sidecar-сервис (логирование)**
Отдельное API, которое получает логи и сохраняет их.
Этот сервис работает **рядом с основным**, обрабатывая логи.
```csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("log")]
public class LoggingController : ControllerBase
{
    private static readonly List<string> Logs = new();

    [HttpPost]
    public IActionResult WriteLog([FromBody] LogEntry log)
    {
        Logs.Add($"{log.Message} (Order ID: {log.OrderId})");
        return Ok();
    }

    [HttpGet]
    public IActionResult GetLogs()
    {
        return Ok(Logs);
    }
}

public record LogEntry(string Message, Guid OrderId);
```

**3. Запуск сервисов в Docker (Sidecar-модель)**
Создаём `docker-compose.yml`, чтобы запустить оба сервиса в **разных контейнерах**.
**Оба сервиса работают вместе**, но независимы.
```yaml
version: '3.8'

services:
  order-service:
    build: ./OrderService
    ports:
      - "5000:80"
    depends_on:
      - logging-sidecar

  logging-sidecar:
    build: ./LoggingSidecar
    ports:
      - "5001:80"
```

### Outer links:

