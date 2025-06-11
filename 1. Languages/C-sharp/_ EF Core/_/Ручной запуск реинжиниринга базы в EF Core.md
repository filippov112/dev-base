#lang #lang-c_sharp

---
**Reverse Engineering** базы - автоматическая генерация таблиц и контекста данных по существующей БД.

1. Устанавливаем пакет инжиниринга:
	```bash
	dotnet add package Microsoft.EntityFrameworkCore.Design
	```

2. Запускаем реверс-инжиниринг базы.
	- VS - package manager console:
	```bash
	Scaffold-DbContext "строка подключения" провайдер_бд
	```
	- CLI:
	```bash
	dotnet ef dbcontext scaffold "строка подключения" провайдер_бд
	```
	```bash
	dotnet ef dbcontext scaffold "Data Source=D:\\helloapp.db" Microsoft.EntityFrameworkCore.Sqlite
	```

### Outer links:
https://metanit.com/sharp/efcore/1.3.php