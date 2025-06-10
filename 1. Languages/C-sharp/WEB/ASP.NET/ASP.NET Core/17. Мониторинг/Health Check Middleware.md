#Csharp #ASP 
# <font color="#00b0f0">ASP.NET:</font> Health Check Middleware

**Health Check Middleware** позволяет проверять состояние приложения, внешних сервисов и инфраструктуры (БД, кэша, API). Используется для мониторинга и автоматического управления развертыванием.

📌 **Что можно проверять?**
- Доступность базы данных (SQL Server, PostgreSQL, Redis).
- Наличие подключения к внешним сервисам.
- Использование памяти и CPU.
- Общее состояние приложения.

📌 **Форматы ответов:**
- **200 OK** — приложение работает нормально.
- **503 Service Unavailable** — проблемы в работе.

```csharp
builder.Services.AddHealthChecks();
// ...
app.MapHealthChecks("/health"); // Теперь `/health` вернет страницу мониторинга "Healthy"
```

#### 🏗 **`IHealthCheckBuilder` — настройка Health Checks**

```csharp
// Добавление проверки SQL Server
builder.Services.AddHealthChecks()
    .AddSqlServer("Server=localhost;Database=TestDb;User Id=sa;Password=yourpassword;");
```

📌 **Основные методы `IHealthCheckBuilder`:**
- `AddCheck<T>(name)` — добавляет проверку типа `T`.
- `AddSqlServer(connectionString)` — проверка SQL Server.
- `AddRedis(connectionString)` — проверка Redis.
- `AddUrlGroup(new Uri("https://example.com"))` — проверка внешнего API.

---

### 🔍 **`IHealthCheck` — реализация собственной проверки**

Создание кастомного Health Check:
```csharp
public class MemoryHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        long threshold = 1024 * 1024 * 100; // 100MB
        long allocatedMemory = GC.GetTotalMemory(false);

        return Task.FromResult(allocatedMemory < threshold
            ? HealthCheckResult.Healthy("Memory usage is normal")
            : HealthCheckResult.Unhealthy("High memory usage"));
    }
}
```

📊 **`HealthCheckResult` — структура ответа**
Состоит из:
- **Статуса (`HealthStatus`)**: `Healthy`, `Degraded`, `Unhealthy`.
- **Описание (`Description`)**: текстовое сообщение.
- **Дополнительных данных (`Data`)**: любые метаданные.
```csharp
return HealthCheckResult.Unhealthy("Redis is not responding", new Exception("Timeout"));
```

Регистрация:
```csharp
builder.Services.AddHealthChecks().AddCheck<MemoryHealthCheck>("memory");
```

---
### 🛠 **Расширенный JSON-ответ через HealthCheckOptions**

📌 Настройка кастомного ответа:
```csharp
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = async (context, report) =>
    {
        var result = new
        {
            status = report.Status.ToString(),
            checks = report.Entries.Select(e => new { e.Key, e.Value.Status, e.Value.Description })
        };
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(result);
    }
});
```

---
### Outer links:
https://metanit.com/sharp/aspnet6/18.1.php