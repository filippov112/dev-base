#lang #lang-c_sharp

---
Помогают контролировать наличие, создание и удаление БД в ключевые моменты программы (запуск, завершение работы, и др.)

- Создание базы - `Database.EnsureCreated()` / `Database.EnsureCreatedAsync()` (`true` если база создана с 0) 
	- <font color="#ff0000">при выполнении миграции этот метод вызывает ошибку</font>
- Удаление базы - `Database.EnsureDeleted()` / `Database.EnsureDeletedAsync()`  (`true` если база существовала до метода)
- Доступность подключения - `Database.CanConnect()` / `Database.CanConnectAsync()`

---
- можно вызывать вне класса контекста данных
```csharp
using (ApplicationContext db = new ApplicationContext())
{
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();
    // асинхронная версия
    await db.Database.EnsureCreatedAsync();
    await db.Database.EnsureDeletedAsync();
}
```

- можно вызвать в коде контекста данных:
```csharp

public class ApplicationContext : DbContext
{
    public ApplicationContext()
    {
        Database.EnsureDeleted(); // гарантируем, что бд удалена
        Database.EnsureCreated(); // гарантируем, что бд будет создана
    }
    ...
}
```

### Outer links:
https://metanit.com/sharp/efcore/2.16.php