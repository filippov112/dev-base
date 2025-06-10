#lang #lang-c_sharp 
# Serilog в C#

**Serilog** — это библиотека для логирования в .NET, ориентированная на структурированные логи. 
Удобен, если требуется анализ логов с сохранением их структуры для последующего поиска и фильтрации.

**sinks** (приемники) - обрабатывают и сохраняют логи.

Основные возможности:
- Поддержка структурированных логов (JSON, текст, XML).
- Гибкая настройка уровней логирования (Information, Warning, Error и др.).
- Возможность фильтрации логов и динамического изменения конфигурации.
- Интеграция с ASP.NET Core, Microsoft.Extensions.Logging и другими фреймворками.
- Большое количество готовых расширений (**sinks**) для вывода логов в различные системы (файлы, базы данных, консоль, облачные сервисы) (Elasticsearch, Seq, SQL, Grafana и др.).

Пример базовой настройки:
```csharp
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

Log.Information("Пример логирования: {ExampleValue}", 42);
```



### Outer links: