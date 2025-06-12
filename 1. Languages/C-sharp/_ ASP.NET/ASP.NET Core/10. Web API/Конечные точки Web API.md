#lang #lang-c_sharp #aspnet

---
> **Web API** - способ построения приложения в стиле *REST* (Representation State Transfer или "передача состояния представления"). 
> REST-архитектура предполагает применение следующих методов для взаимодействия с сервером:
> - GET (получение данных)
> - POST (добавление данных)
> - PUT (изменение данных)
> - DELETE (удаление данных)

**Методы расширения `IEndpointRouteBuilder` (`WebApplication`) / Конечные точки:**
- `MapGet` (запрос GET)
- `MapPost` (запрос POST)  
- `MapPut` (запрос PUT)
- `MapDelete` (запрос DELETE)

```csharp
app.MapGet("/api/users/{id}", (string id) =>
{
    // получаем пользователя по id
    Person? user = users.FirstOrDefault(u => u.Id == id);
    // если не найден, отправляем статусный код и сообщение об ошибке
    if (user == null)  return Results.NotFound(new { message = "Пользователь не найден" });
 
    // если пользователь найден, отправляем его
    return Results.Json(user);
});
```


### Outer links:
https://metanit.com/sharp/aspnet6/11.1.php