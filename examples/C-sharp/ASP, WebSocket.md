#example #aspnet

___
В ASP.NET MVC можно добавить поддержку WebSocket следующим образом:

### 1. Включить поддержку WebSocket в `Program.cs`

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Включение поддержки WebSocket
var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};
app.UseWebSockets(webSocketOptions);

app.UseRouting();
app.UseAuthorization();

app.Use(async (context, next) =>
{
    if (context.Request.Path == "/ws" && context.WebSockets.IsWebSocketRequest)
    {
        using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        await WebSocketHandler.HandleWebSocketAsync(webSocket);
    }
    else
    {
        await next();
    }
});

app.MapControllers();
app.Run();
```

### 2. Создать обработчик WebSocket-соединений

```csharp
using System.Net.WebSockets;
using System.Text;

public static class WebSocketHandler
{
    public static async Task HandleWebSocketAsync(WebSocket webSocket)
    {
        var buffer = new byte[1024 * 4];

        while (webSocket.State == WebSocketState.Open)
        {
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            if (result.MessageType == WebSocketMessageType.Text)
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var response = $"Эхо: {message}";

                var responseBytes = Encoding.UTF8.GetBytes(response);
                await webSocket.SendAsync(new ArraySegment<byte>(responseBytes), WebSocketMessageType.Text, true, CancellationToken.None);
            }
            else if (result.MessageType == WebSocketMessageType.Close)
            {
                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Закрыто клиентом", CancellationToken.None);
            }
        }
    }
}
```

### 3. Подключиться к WebSocket на клиенте (JavaScript)

```js
const socket = new WebSocket("ws://localhost:5000/ws");

socket.onopen = () => {
    console.log("Соединение установлено");
    socket.send("Привет, сервер!");
};

socket.onmessage = (event) => {
    console.log("Сообщение от сервера:", event.data);
};

socket.onclose = () => {
    console.log("Соединение закрыто");
};
```

После этого WebSocket-сервер будет принимать сообщения от клиента и отправлять их обратно с префиксом "Эхо".

### Outer links: