#lang #lang-c_sharp 

# SignalR в ASP.NET Core

**SignalR** — это библиотека от Microsoft для ASP.NET, для упрощения работы с <u>двусторонней (реактивной) связью</u> клиент-сервер в реальном времени без постоянных запросов от клиента.

- Use cases: Чаты, уведомления, потоковая передача данных и другие задачи мгновенной синхронизации клиент-сервер. 
- Поддерживает механизмы: ==WebSockets, Server-Sent Events или Long Polling==
- Масштабируется через Redis или другие бекенды.

**Хаб** — это серверная точка взаимодействия, которая управляет подключениями и отправкой/получением сообщений.

---

## Пример

- **Сервер**: в нем создается хаб `ChatHub`, который обрабатывает сообщения от клиентов.
- **Клиент**: с помощью `signalR.HubConnectionBuilder()` создается подключение к хабу, и клиент может отправлять и получать сообщения через методы хаба.

#### Сервер
1. **Добавление SignalR в проект:**
    Для начала необходимо установить библиотеку SignalR через NuGet:
    ```bash
    dotnet add package Microsoft.AspNetCore.SignalR
    ```
    
2. **Создание хаба:** Хаб — это класс, который обрабатывает взаимодействие между сервером и клиентом через WebSocket.
```csharp
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ChatHub : Hub
{
    // Метод, который вызывается клиентом для отправки сообщения. 
    public async Task SendMessage(string user, string message)
    {
        // Отправка сообщения всем подключенным клиентам
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
```

3.  **Настройка SignalR в `Programm.cs`:**
    Чтобы зарегистрировать хаб на сервере, нужно добавить SignalR в конфигурацию проекта. 
```csharp

//var builder = WebApplication.CreateBuilder(args);

// Регистрация SignalR
builder.Services.AddSignalR();

//var app = builder.Build();

// Указываем маршруты для хаба
app.MapHub<ChatHub>("/chatHub");

//app.Run();
```

4. **Запуск сервера:**
    После добавления хаба и настройки маршрута, сервер будет доступен по URL `/chatHub`.


#### Клиент JavaScript

1. **Добавление SignalR клиента через npm:**
    Установите SignalR через npm:
    ```bash
    npm install @microsoft/signalr
    ```
    или так
    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/7.0.5/signalr.min.js"></script>
	```
    
2. **Код клиента на JavaScript:**

```javascript
// Подключение к SignalR хабу
const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub") // URL хаба на сервере
    .build();

// Обработчик получения сообщений от сервера
connection.on("ReceiveMessage", function (user, message) {
    console.log(user + ": " + message);
});

// Установление соединения
connection.start().then(function () {
    console.log("Connected to the hub");

    // Отправка сообщения на сервер
    connection.invoke("SendMessage", "Client", "Hello, server!")
        .catch(function (err) {
            return console.error(err.toString());
        });
}).catch(function (err) {
    return console.error(err.toString());
});
```

### Outer links:

