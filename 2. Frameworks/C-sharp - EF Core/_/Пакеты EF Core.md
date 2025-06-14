#lang #lang-c_sharp #efcore

---
`dotnet add package`

Основные:
- `Microsoft.EntityFrameworkCore`, 
- пакеты провайдеров СУБД (например, `Microsoft.EntityFrameworkCore.SqlServer`)

Для CLI нужен .NET SDK, а также: 
- `Microsoft.EntityFrameworkCore.Design` - миграции и дизайн баз данных.
- `Microsoft.EntityFrameworkCore.Tools` - CLI-команды (в т.ч. для миграций и обновления базы данных)

Другие:
- `Microsoft.EntityFrameworkCore.InMemory` - для тестирования без подключения к БД.
- `Microsoft.EntityFrameworkCore.Proxies` - lazy loading (ленивую загрузку) через динамические прокси-объекты.
- `Microsoft.EntityFrameworkCore.Analyzers` - статический анализ кода EF.
- `Microsoft.EntityFrameworkCore.Relational` - доп. возможности реляционных баз.
