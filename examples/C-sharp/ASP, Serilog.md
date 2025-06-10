#example 

# 1. Serilog + ASP.NET в C#

Настроить логирование через Serilog в ASP.NET можно следующим образом:

1. Установить пакеты
	```sh
	dotnet add package Serilog.AspNetCore
	dotnet add package Serilog.Sinks.Console
	dotnet add package Serilog.Sinks.File
	```

2. Инициализировать Serilog в `Program.cs`
	```csharp
	using Serilog;
	
	var builder = WebApplication.CreateBuilder(args);
	
	// Настройка Serilog
	Log.Logger = new LoggerConfiguration()
	    .WriteTo.Console()
	    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
	    .CreateLogger();
	
	// Использование Serilog
	builder.Host.UseSerilog();
	
	var app = builder.Build();
	
	// Включение логирования HTTP-запросов
	app.UseSerilogRequestLogging();
	
	app.Run();
	```

3. Использовать логгер в контроллерах

	```csharp
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.Extensions.Logging;
	
	public class HomeController : Controller
	{
	    private readonly ILogger<HomeController> _logger;
	
	    public HomeController(ILogger<HomeController> logger)
	    {
	        _logger = logger;
	    }
	
	    public IActionResult Index()
	    {
	        _logger.LogInformation("Запрос к главной странице");
	        return View();
	    }
	}
	```

После запуска приложения логи будут записываться в консоль и в файлы в папке `logs/`.

### Outer links: