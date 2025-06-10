## То есть нужно, чтобы у каждого Handler-а был свой уникальный Requirement?
Не обязательно — но **чаще всего да**, особенно когда для требования нужна специфичная логика.

---

### 📌 Как это работает

Фреймворк вызывает метод `HandleRequirementAsync` у каждого `AuthorizationHandler<TRequirement>`, где `TRequirement` совпадает с типом требования, указанным в политике.

То есть:

```csharp
public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement> { ... }
```

будет вызван **только** для `MinimumAgeRequirement`. И это удобно — можно писать обработчики строго под конкретные требования.

---

### 🤔 А можно ли один обработчик для нескольких требований?

Да. Есть два способа:

#### 1. Реализовать `AuthorizationHandler` напрямую

```csharp
public class MultiRequirementHandler : IAuthorizationHandler
{
    public Task HandleAsync(AuthorizationHandlerContext context)
    {
        foreach (var requirement in context.Requirements)
        {
            if (requirement is RequirementA)
            {
                // Обработка A
                context.Succeed(requirement);
            }

            if (requirement is RequirementB)
            {
                // Обработка B
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}
```

Такой подход работает, но **менее читаемый** и менее гибкий.

---

#### 2. Наследовать от `AuthorizationHandler<T>` с базовым типом

Если требования реализуют общий интерфейс или базовый класс, можно написать:

```csharp
public class BaseRequirementHandler : AuthorizationHandler<BaseRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, BaseRequirement requirement)
    {
        // Обработка любого BaseRequirement
        return Task.CompletedTask;
    }
}
```

---

### ✅ Резюме

- Удобнее, когда у каждого `Handler` — свой `Requirement`, это типично и читаемо.
    
- Можно один обработчик на несколько требований, но это увеличивает сложность кода.
    
- ASP.NET Core вызывает обработчики по совпадению типа `TRequirement`, не по имени, не по политике — только по типу.

## А если несколько обработчиков для одного требования, это возможно?

Да, **возможно и полностью поддерживается**: для одного и того же `IAuthorizationRequirement` можно зарегистрировать **несколько `AuthorizationHandler<TRequirement>`**, и они все будут вызваны.

---

### 🔍 Как это работает

Когда вызывается авторизация, ASP.NET Core:

1. Находит все требования (`IAuthorizationRequirement`) из политики
    
2. Ищет **все обработчики**, подходящие под тип каждого требования
    
3. Вызывает все подходящие `HandleRequirementAsync`
    

---

### ✅ Пример

```csharp
public class LoggingAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        Console.WriteLine("Logging check for age...");
        return Task.CompletedTask;
    }
}

public class ValidateAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        var hasClaim = context.User.HasClaim(c => c.Type == "age");

        if (hasClaim &&
            int.TryParse(context.User.FindFirst("age")?.Value, out var age) &&
            age >= requirement.MinimumAge)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
```

```csharp
// Регистрация:
builder.Services.AddSingleton<IAuthorizationHandler, LoggingAgeHandler>();
builder.Services.AddSingleton<IAuthorizationHandler, ValidateAgeHandler>();
```

---

### ⚠️ Важно

- **Обработчики не знают друг о друге** — каждый независимо вызывает `context.Succeed(...)`, если требование выполнено.
    
- **Достаточно, чтобы один обработчик вызвал `Succeed()`** — и требование будет считаться выполненным.
    
- Если **ни один не вызовет `Succeed()`** (или хотя бы `Fail()`), требование не будет выполнено.
    

---

### 🧠 Резюме

- Несколько обработчиков для одного требования — это нормально.
    
- Все будут вызваны.
    
- Условие считается пройденным, если **хотя бы один обработчик вызвал `context.Succeed(requirement)`**.