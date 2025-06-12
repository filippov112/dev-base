#theory #theory-dev
 
---
**Strangler Fig** — это способ постепенного переписывания старой системы на новую, без остановки работы.

**Как?**  
В коде это значит, что новые запросы идут в новый сервис, а старые части кода заменяются поэтапно, без необходимости переписывать всё сразу.

**Когда?**
- Подходит для миграции монолита в микросервисы или обновления API и трудно переписать сразу.
- Когда важно не прерывать работу системы во время обновления.
- Если новый код нужно тестировать по частям перед полной миграцией.

**Рекомендации**
- Можно тестировать новый сервис параллельно со старым, снижая риски.

---
#### **Пример Strangler Fig на C#**

Допустим, у нас есть старый монолитный сервис, и мы хотим постепенно мигрировать его на новый микросервис.

**1. Старый монолит (Legacy API)**
Это существующий API, который мы хотим заменить.
Этот сервис возвращает заказ, но работает на **устаревшей логике**.
```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/orders")]
public class LegacyOrderController : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult GetOrder(int id)
    {
        return Ok(new { OrderId = id, Product = "OldProduct", Source = "Legacy API" });
    }
}
```

**2. Новый микросервис (New API)**
Создаём **новый API** с улучшенной логикой.
Этот сервис заменит старый, но пока **не используется напрямую**.
```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/new-orders")]
public class NewOrderController : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult GetOrder(int id)
    {
        return Ok(new { OrderId = id, Product = "NewProduct", Source = "New API" });
    }
}
```

**3. Прокси-контроллер (Strangler Fig Proxy)**
Создаём **посредник**, который перенаправляет запросы:
- Если заказ `> 100`, идёт в **новый сервис**.
- Если заказ `≤ 100`, идёт в **старый сервис**.
Теперь клиенты используют **единый API**, а **логика плавно переходит** на новый сервис.
```csharp
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

[ApiController]
[Route("api/orders")]
public class OrderProxyController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public OrderProxyController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        string url = id > 100 ? "http://localhost:5001/api/new-orders/" : "http://localhost:5000/api/orders/";

        var response = await _httpClient.GetStringAsync(url + id);
        return Content(response, "application/json");
    }
}
```

**4. Развёртывание в Docker (поэтапная миграция)**
Создаём `docker-compose.yml`, чтобы развернуть **оба сервиса** и прокси.
Запросы сначала идут через **прокси**, а затем **постепенно** направляются в новый сервис.
```yaml
version: '3.8'

services:
  legacy-api:
    build: ./LegacyAPI
    ports:
      - "5000:80"

  new-api:
    build: ./NewAPI
    ports:
      - "5001:80"

  proxy:
    build: ./ProxyAPI
    ports:
      - "5002:80"
    depends_on:
      - legacy-api
      - new-api
```

### Outer links:

