#theory #theory-dev
 
---
***BFF (Backend for Frontend)*** — это API, созданный специально для одного типа клиентского приложения. 
Например, мобильное приложение и веб-сайт могут иметь разные BFF, адаптированные под их потребности.

**Зачем?**
- Разные клиенты требуют разные данные и способы их обработки.
- Позволяет уменьшить нагрузку на фронтенд, выполняя сложные операции на сервере.
- Упрощает обновление и поддержку клиентских приложений.

**Когда?**
1. Когда у вас несколько клиентских приложений (например, мобильное и веб).
2. Если фронтенд сильно зависит от бизнес-логики и часто её дублирует.
3. Когда нужно улучшить производительность за счёт адаптации данных под клиента.

**Рекомендации**
- Используйте BFF, если у разных клиентов разные потребности в данных.
- Размещайте BFF рядом с клиентом, чтобы минимизировать задержки.
- Не превращайте BFF в "второй API Gateway" — он должен только адаптировать данные, а не управлять всей системой.

---

#### **Пример BFF на C# с ASP.NET Core**

Допустим, у нас есть два клиента:
Мобильное приложение — получает краткие данные о пользователе.
Веб-приложение — получает расширенную информацию.

Вместо того чтобы каждый клиент сам запрашивал микросервисы, мы создаём два BFF:
`MobileBFF` (для мобильного приложения).
`WebBFF` (для веб-приложения).

4. **Мобильное приложение** запрашивает `GET /api/mobile/user/1` и получает:
    ```json
    {
      "id": 1,
      "name": "Иван Иванов"
    }
    ```

5. **Веб-приложение** запрашивает `GET /api/web/user/1` и получает:
    ```json
    {
      "id": 1,
      "name": "Иван Иванов",
      "email": "ivan@example.com",
      "phone": "+7 999 123-45-67"
    }
    ```

**Mobile BFF (возвращает краткую информацию)**
Этот BFF запрашивает данные у `UserService`, но передаёт только `Id` и `Name`, без лишней информации.
```csharp
[ApiController]
[Route("api/mobile/user")]
public class MobileUserController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public MobileUserController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _httpClient.GetFromJsonAsync<UserDto>($"http://userservice/api/users/{id}");
        if (user == null) return NotFound();

        return Ok(new
        {
            user.Id,
            user.Name
        });
    }
}
```

**Web BFF (возвращает полные данные)**
Этот BFF отправляет клиенту все данные без фильтрации.
```csharp
[ApiController]
[Route("api/web/user")]
public class WebUserController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public WebUserController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _httpClient.GetFromJsonAsync<UserDto>($"http://userservice/api/users/{id}");
        if (user == null) return NotFound();

        return Ok(user); // Отдаём всю информацию
    }
}
```

### Outer links:

