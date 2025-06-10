#lang #lang-c_sharp
# Управление конфигурацией в `appsettings.json`

1. Ставим пакет `Microsoft.Extensions.Configuration.Json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=helloapp.db"
  }
}
```

```csharp
using Microsoft.Extensions.Configuration;
 
var builder = new ConfigurationBuilder();
builder.SetBasePath(Directory.GetCurrentDirectory());
builder.AddJsonFile("appsettings.json");
var config = builder.Build();

var connectionString = config.GetConnectionString("DefaultConnection"); // получаем строку подключения
```