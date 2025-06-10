#example
# Google oAuth 2.0 + ASP.NET Identity

Регистрация и авторизация через Google в ASP.NET WebAPI, через **OAuth 2.0** и **Google Authentication** в **ASP.NET Identity**.

---
### **Как это работает?**

1. При вызове `/api/auth/google-login` пользователь перенаправляется на Google для авторизации.
2. После успешного входа Google перенаправляет пользователя на `/api/auth/google-response`.
3. Контроллер получает информацию о пользователе и:
    - Если он **уже есть** в базе данных — выполняется вход.
    - Если он **новый** — создаётся запись в БД и затем выполняется вход.
4. Пользователь остаётся авторизованным благодаря **файлам cookie**.
5. При повторном входе на сайт проверяется сессия, и пользователь остаётся залогиненным.

Теперь аутентификация через Google будет работать с сохранением данных в базе и автоматическим входом при следующем визите.

---
### Реализация

1. **Создать OAuth-клиент в Google Cloud Console**
	- Перейти в [Google Cloud Console](https://console.cloud.google.com/).
	- Создать проект.
	- Создать клиент приложения https://console.developers.google.com/auth/clients
	- Выбрать **Web application**.
	- В разделе **Authorized JavaScript origins** добавить: `http://localhost`
	- В разделе **Authorized Redirect URIs** добавить: `http://localhost:5125/signin-google`
	- Сохранить **Client ID** и **Client Secret**.

2. **Добавить нужные пакеты в ASP.NET WebAPI**
	- Версию выбираем по версии .NET https://nuget.rza.ru/packages/
		```sh
		dotnet add package Microsoft.AspNetCore.Authentication.Google --version 8.0.10
		dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
		dotnet add package Microsoft.AspNetCore.Identity.UI
		dotnet add package Microsoft.EntityFrameworkCore.PostgreSQL
		```

3. **Добавить модель пользователя**
	- Создать класс пользователя, унаследованный от `IdentityUser`:
	```csharp
	public class ApplicationUser : IdentityUser
	{
	}
	```

4. **Добавить контекст базы данных**
	- Создать `AppDbContext`, унаследованный от `IdentityDbContext<ApplicationUser>`:
	```csharp
	public class AppDbContext : IdentityDbContext<ApplicationUser>
	{
	    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
	}
	```

5. **Настроить аутентификацию в `Program.cs`**
	```csharp
	//var builder = WebApplication.CreateBuilder(args);
	
	builder.Services.AddAuthentication(options =>
	{
	    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
	    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
	    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
	})
	.AddCookie()
	.AddGoogle(options =>
	{
	    options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
	    options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
	});
	
	builder.Services.AddAuthorization();
	
	
	//var app = builder.Build();
	app.UseAuthentication();
	app.UseAuthorization();
	//app.Run();
	```

6. **Настроить аутентификацию и Identity в `Program.cs`**
```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);


builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();
// builder.Services.AddAuthentication(options =>
//{
   // options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = IdentityConstants.ExternalScheme; // нужна расширенная схема
   // ...

// var app = builder.Build();
// app.Run();
```

7. **Добавить данные клиента в `appsettings.json`**
	```json
	{
	  "Authentication": {
	    "Google": {
	      "ClientId": "your-client-id",
	      "ClientSecret": "your-client-secret"
	    }
	  }
	}
	```

8. **Добавить контроллер для аутентификации**
	```csharp
	using System.Security.Claims;
	using Microsoft.AspNetCore.Authentication;
	using Microsoft.AspNetCore.Authentication.Google;
	using Microsoft.AspNetCore.Identity;
	using Microsoft.AspNetCore.Mvc;
	
	[ApiController]
	[Route("api/auth")]
	public class AuthController : ControllerBase
	{
	    // UserManager используется для управления пользователями: 
	    // создание, поиск, обновление, удаление и проверка данных
	    private readonly UserManager<ApplicationUser> _userManager;
	    
	    // SignInManager отвечает за аутентификацию, вход и выход пользователей, 
	    // а также управление внешними логинами (например, Google)
	    private readonly SignInManager<ApplicationUser> _signInManager;
	
	    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
	    {
	        _userManager = userManager;
	        _signInManager = signInManager;
	    }
	
	    // Запрос на вход через Google, перенаправляет пользователя на страницу Google для аутентификации
	    [HttpGet("google-login")]
	    public IActionResult GoogleLogin()
	    {
		    // URL, куда Google вернёт пользователя после входа
	        var redirectUrl = Url.Action(nameof(GoogleResponse), "Auth", null, Request.Scheme); 
	        // Настройки аутентификации
	        var properties = _signInManager.ConfigureExternalAuthenticationProperties(GoogleDefaults.AuthenticationScheme, redirectUrl); 
	        // Запрос аутентификации через Google
	        return Challenge(properties, GoogleDefaults.AuthenticationScheme); 
	    }
	
	    // Обработчик ответа от Google после успешной аутентификации
	    [HttpGet("google-response")]
	    public async Task<IActionResult> GoogleResponse()
	    {
		    // Проверяем, аутентифицирован ли пользователь
	        var result = await HttpContext.AuthenticateAsync(IdentityConstants.ExternalScheme); 
	        if (!result.Succeeded)
		        // Если аутентификация не удалась, возвращаем 401
	            return Unauthorized(); 
		    
		    // Получаем информацию о пользователе из внешнего входа (Google)
	        var info = await _signInManager.GetExternalLoginInfoAsync(); 
	        if (info == null)
	            return BadRequest("Ошибка при получении информации о пользователе");
				
			// Проверяем, есть ли пользователь с таким email в базе данных
	        var user = await _userManager.FindByEmailAsync(info.Principal.FindFirstValue(ClaimTypes.Email)); 
	        if (user == null)
	        {
	            // Если пользователя нет, создаём новую запись
	            user = new ApplicationUser
	            {
	                UserName = info.Principal.FindFirstValue(ClaimTypes.Email),
	                Email = info.Principal.FindFirstValue(ClaimTypes.Email)
	            };
	            
				// Сохраняем пользователя в БД
	            var result1 = await _userManager.CreateAsync(user); 
	            if (!result1.Succeeded)
	                return BadRequest("Ошибка при создании пользователя");
				
				// Привязываем вход через Google к созданному пользователю
	            await _userManager.AddLoginAsync(user, info);
	        }
	        
			// Авторизуем пользователя в системе
	        await _signInManager.SignInAsync(user, isPersistent: false); 
	        // Возвращаем информацию о входе
	        return Ok(new { message = "Пользователь успешно вошел", user.Email }); 
	    }
	}
	```

9. **Добавить миграции и обновить базу данных**
```sh
dotnet ef migrations add AddIdentity
dotnet ef database update
```
