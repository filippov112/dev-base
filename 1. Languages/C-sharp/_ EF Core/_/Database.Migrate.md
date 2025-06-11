#lang #lang-c_sharp

---
 Миграции в `runtime` - `Database.Migrate()` / `Database.MigrateAsync()`
 
```csharp
using (ApplicationContext db = new ApplicationContext())
{
	db.Database.Migrate();  // миграция
	await db.Database.MigrateAsync(); // асинхронный метод для миграции
}
```
