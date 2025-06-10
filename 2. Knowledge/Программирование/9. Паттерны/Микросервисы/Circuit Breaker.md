#microservice #micro_pattern

# Circuit Breaker

***Circuit Breaker (предохранитель)*** — это механизм, который предотвращает повторные запросы к проблемному сервису, если он начал сбоить.

**Как?**  
1. Если сервис отвечает нормально → всё хорошо.
2. Если сервис начинает часто выдавать ошибки → Circuit Breaker временно блокирует запросы.
3. Через время он снова проверяет, восстановился ли сервис.

**Когда?**
- Если один из микросервисов может перегрузиться или упасть.
- Когда есть задержки в сети, и повторные запросы могут ухудшить ситуацию.
- Если система должна быстро реагировать на сбои без долгих тайм-аутов.

**Рекомендации**
- Используйте Circuit Breaker, если сервисы зависят друг от друга и сбой одного может вызвать каскадный отказ.
- Подбирайте количество ошибок и время блокировки в зависимости от нагрузки и критичности сервиса.
- Комбинируйте с Retry-политиками (повторные попытки), но не перегружайте систему.

---

#### **Пример Circuit Breaker на C# с Polly**

Допустим, у нас есть клиентский сервис, который обращается к API другого сервиса. Если этот API перестаёт отвечать, Circuit Breaker временно блокирует запросы.

1. Если сервис отвечает нормально → запрос проходит.
2. Если подряд случается 2 ошибки → Circuit Breaker блокирует запросы на 10 секунд.
3. После паузы он снова пробует запрос, чтобы проверить, восстановился ли сервис.

Polly — это библиотека для управления отказами в .NET, в том числе для реализации Circuit Breaker.
```sh
dotnet add package Polly
```

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Polly;
using Polly.CircuitBreaker;

public class ApiService
{
    private readonly HttpClient _httpClient;
    private readonly AsyncCircuitBreakerPolicy _circuitBreaker;

    public ApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;

        _circuitBreaker = Policy
            .Handle<HttpRequestException>() // Ловим сетевые ошибки
            .Or<TaskCanceledException>()    // Ловим тайм-ауты
            .CircuitBreakerAsync(2, TimeSpan.FromSeconds(10)); // После 2 ошибок блокируем запросы на 10 сек
    }

    public async Task<string?> GetDataAsync()
    {
        try
        {
            return await _circuitBreaker.ExecuteAsync(async () =>
            {
                HttpResponseMessage response = await _httpClient.GetAsync("https://example.com/api/data");
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync();
            });
        }
        catch (BrokenCircuitException)
        {
            return "Service is temporarily unavailable. Try again later.";
        }
    }
}
```

### Outer links:

