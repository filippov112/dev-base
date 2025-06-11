#lang #lang-c_sharp

---
В C# для работы с секретами из файла **`.env`** можно использовать библиотеку `DotNetEnv`, которая позволяет загружать переменные окружения из такого файла.  

| Способ | Когда использовать |  
|--------|------------------|  
| **DotNetEnv** | Простые консольные приложения, Unity |  
| **User Secrets** | ASP.NET Core (разработка) |  
| **Azure Key Vault**, **AWS Secrets Manager** или переменные окружения сервера | Продакшен-среда |  

---
1. Установка библиотеки DotNetEnv  
	```bash
	dotnet add package DotNetEnv
	```

2. Создание `.env` файла  
	```env
	DB_CONNECTION_STRING=Server=myServer;Database=myDB;User=admin;Password=12345
	API_KEY=abcdef123456
	JWT_SECRET=super_secret_key
	```

3. Загрузка переменных в приложении  
	```csharp
	using DotNetEnv;
	
	// Загружаем .env файл (по умолчанию ищет в корне проекта)
	Env.Load();
	
	// Если файл имеет другое имя или путь:
	// Env.Load("path/to/custom.env");
	
	// Получаем переменные
	string dbConnectionString = Env.GetString("DB_CONNECTION_STRING");
	string apiKey = Env.GetString("API_KEY");
	string jwtSecret = Env.GetString("JWT_SECRET");
	```

---

### **4. Альтернатива: `IConfiguration` в ASP.NET Core**  
В **ASP.NET Core** можно использовать встроенный механизм конфигурации:  

#### **Установи пакет:**  
```bash
dotnet add package Microsoft.Extensions.Configuration.UserSecrets
```

#### **Добавь `.env` в `appsettings.json` (небезопасно!) или лучше в `secrets.json`**  
```json
{
  "ConnectionStrings": {
    "Default": "Server=myServer;Database=myDB;User=admin;Password=12345"
  },
  "ApiKeys": {
    "WeatherApi": "abcdef123456"
  }
}
```

#### **Чтение через `IConfiguration`**  
```csharp
var builder = WebApplication.CreateBuilder(args);

// Добавляем User Secrets (для разработки)
builder.Configuration.AddUserSecrets<Program>();

// Получаем конфигурацию
string dbConnection = builder.Configuration.GetConnectionString("Default");
string apiKey = builder.Configuration["ApiKeys:WeatherApi"];

Console.WriteLine($"DB: {dbConnection}");
Console.WriteLine($"API Key: {apiKey}");
```


