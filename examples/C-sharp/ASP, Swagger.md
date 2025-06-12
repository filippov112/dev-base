#example #aspnet

___
Для интеграции Swagger в **ASP.NET MVC (Core)** используется библиотека _Swashbuckle.AspNetCore_. Порядок действий:

1. **Установить пакет**  
    В _Package Manager Console_:
    ```powershell
    Install-Package Swashbuckle.AspNetCore
    ```
    
2. **Регистрация Swagger в `Global.asax`**
	В `Programm.cs` в `ConfigureServices` добавить:
    ```csharp
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    });
    
	// ...
	
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
    ```
    
3. **Запустить и открыть**  
    После старта приложения Swagger UI будет доступен по адресу:
    ```
    https://localhost:<порт>/swagger
    ```

Дополнительно можно включить XML-документацию и настраивать авторизацию.

---
## Документация

Чтобы Swagger отображал XML-документацию в **ASP.NET MVC (Core)**, нужно:

1. **Включить генерацию XML-документации**  
    В `*.csproj` добавить:
    ```xml
    <PropertyGroup>
        <GenerateDocumentationFile>true</GenerateDocumentationFile>
        <NoWarn>1591</NoWarn> <!-- Чтобы убрать предупреждения об отсутствии комментариев -->
    </PropertyGroup>
    ```
    
2. **Настроить Swagger для использования XML**  
    В `Startup.cs` (или `Program.cs` в .NET 6+):
    ```csharp
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    services.AddSwaggerGen(c =>
    {
        c.IncludeXmlComments(xmlPath);
    });
    ```
    
3. **Добавить комментарии к методам контроллеров**
    ```csharp
	/// <summary>
	/// Контроллер для работы с пользователями.
	/// </summary>
	public class UsersController : ApiController
	{
	    /// <summary>
	    /// Получить список всех пользователей.
	    /// </summary>
	    /// <returns>Коллекция пользователей.</returns>
	    [HttpGet]
	    [Route("api/users")]
	    public IEnumerable<string> GetUsers()
	    {
	        return new string[] { "User1", "User2" };
	    }
	
	    /// <summary>
	    /// Получить пользователя по ID.
	    /// </summary>
	    /// <param name="id">Идентификатор пользователя.</param>
	    /// <returns>Имя пользователя.</returns>
	    [HttpGet]
	    [Route("api/users/{id}")]
	    public string GetUser(int id)
	    {
	        return $"User{id}";
	    }
	}
    ```