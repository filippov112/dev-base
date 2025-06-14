Регистрация сервиса

```csharp
builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();
```

означает, что мы добавляем в контейнер зависимостей реализацию интерфейса `IAuthorizationHandler`. Это необходимо, чтобы ASP.NET Core знал, как обрабатывать требование `MinimumAgeRequirement`.

📌 **Зачем это нужно?**
Когда происходит авторизация с политикой, содержащей требования, фреймворк автоматически вызывает всех зарегистрированных `IAuthorizationHandler`, чтобы они проверили, выполняется ли требование. Без этой регистрации обработчик не будет вызван — и авторизация всегда будет проваливаться, даже если данные пользователя подходят.

---

### 🤔 Что если у нас несколько обработчиков?

Это нормально и поддерживается из коробки. Каждый обработчик регистрируется отдельно, например:

```csharp
builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();
builder.Services.AddSingleton<IAuthorizationHandler, CountryRequirementHandler>();
builder.Services.AddSingleton<IAuthorizationHandler, CustomRequirementHandler>();
```

Или можно использовать `AddScoped` или `AddTransient` вместо `AddSingleton`, если в обработчике используются `DbContext` или другие зависимости с меньшим временем жизни.

Во время авторизации ASP.NET Core:

1. Находит все политики, указанные в `[Authorize(Policy = "...")]`
    
2. Извлекает все `IAuthorizationRequirement` из этих политик
    
3. Проходит по **всем зарегистрированным `IAuthorizationHandler`** и вызывает `HandleRequirementAsync()` у тех, чьи дженерики совпадают с типами требований
    

Таким образом, наличие нескольких обработчиков не вызывает конфликтов: каждый будет вызван только по своему требованию.

---

Если нужен один обработчик для нескольких требований, можно использовать `AuthorizationHandler<Requirement1, Requirement2>`, либо реализовать `IAuthorizationHandler` напрямую и в `HandleAsync()` вручную проверять все нужные типы требований.