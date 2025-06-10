#microservice #micro_pattern

# API Gateway

***API Gateway*** — это главный вход в систему микросервисов. Он работает как диспетчер: принимает запросы от клиентов, перенаправляет их нужным микросервисам, объединяет ответы и отправляет их обратно.

**Зачем?**  
Без него клиенты (например, мобильные приложения) должны напрямую обращаться к разным микросервисам, что усложняет взаимодействие. API Gateway упрощает это, скрывая внутреннюю структуру системы.

**Когда?**
1. Много микросервисов связанных с клиентом.
2. Микросервисы нуждаются в защите (аутентификация, ограничение запросов, кеширование).
3. Если требуется преобразовывать запросы и ответы (например, агрегировать данные из нескольких сервисов).

---
#### **Пример**

Создадим API Gateway, который перенаправляет запросы на два микросервиса:
Orders API (`http://localhost:5001`)
Users API (`http://localhost:5002`)

API Gateway принимает запросы:
`GET /orders/123` → перенаправляет на `http://localhost:5001/orders/123`
`GET /users/456` → перенаправляет на `http://localhost:5002/users/456`

Клиенту не нужно знать адреса микросервисов — API Gateway всё делает сам.

[YARP (Yet Another Reverse Proxy)] — это библиотека от Microsoft для создания API Gateway.
```sh
dotnet add package Yarp.ReverseProxy
```

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Yarp.ReverseProxy.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Добавляем обратный прокси
builder.Services.AddReverseProxy()
    .LoadFromMemory(new[]
    {
        new RouteConfig
        {
            RouteId = "orders-route",
            ClusterId = "orders-cluster",
            Match = new RouteMatch { Path = "/orders/{**catch-all}" }
        },
        new RouteConfig
        {
            RouteId = "users-route",
            ClusterId = "users-cluster",
            Match = new RouteMatch { Path = "/users/{**catch-all}" }
        }
    }, new[]
    {
        new ClusterConfig
        {
            ClusterId = "orders-cluster",
            Destinations = new Dictionary<string, DestinationConfig>
            {
                { "orders", new DestinationConfig { Address = "http://localhost:5001" } }
            }
        },
        new ClusterConfig
        {
            ClusterId = "users-cluster",
            Destinations = new Dictionary<string, DestinationConfig>
            {
                { "users", new DestinationConfig { Address = "http://localhost:5002" } }
            }
        }
    });

var app = builder.Build();

app.MapReverseProxy();

app.Run();
```

### Outer links:

