#example #lang-c_sharp 

___
1. **Сервер** ждет подключения на `http://localhost:5000/`, принимает WebSocket-запросы и обрабатывает их.
2. **Клиент** устанавливает WebSocket-соединение с сервером и может отправлять сообщения.

### Сервер
Библиотека `System.Net.WebSockets`

1. **HttpListener** используется для создания HTTP-сервера, который принимает WebSocket-запросы.
2. Когда приходит запрос с `Upgrade` заголовком, сервер принимает WebSocket-соединение.
3. **HandleClient** — метод для обработки сообщений от клиента. Он получает данные, преобразует их в строку и отправляет обратно на клиент.

```csharp
using System;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

class WebSocketServer
{
    private static async Task HandleClient(WebSocket webSocket)
    {
        byte[] buffer = new byte[1024];
        while (webSocket.State == WebSocketState.Open)
        {
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            if (result.MessageType == WebSocketMessageType.Text)
            {
                string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                Console.WriteLine($"Received: {message}");

                // Отправка ответа клиенту
                string response = $"Server response: {message}";
                byte[] responseBytes = Encoding.UTF8.GetBytes(response);
                await webSocket.SendAsync(new ArraySegment<byte>(responseBytes), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }

    public static async Task StartServer()
    {
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:5000/"); // Адрес сервера
        listener.Start();

        Console.WriteLine("WebSocket server started...");
        
        while (true)
        {
            HttpListenerContext context = await listener.GetContextAsync();
            if (context.Request.IsWebSocketRequest)
            {
                WebSocket webSocket = (await context.AcceptWebSocketAsync(null)).WebSocket;
                await HandleClient(webSocket);
            }
            else
            {
                context.Response.StatusCode = 400;
                context.Response.Close();
            }
        }
    }

    public static void Main()
    {
        StartServer().Wait();
    }
}
```

### Клиент - js

На стороне клиента WebSocket создается с помощью встроенного API `WebSocket`.

1. Создание объекта `WebSocket` с указанием URL-адреса сервера.
2. Когда соединение установлено (`onopen`), клиент может отправить сообщение серверу.
3. Событие `onmessage` обрабатывает приходящие сообщения от сервера и выводит их на консоль.
4. Событие `onclose` срабатывает при закрытии соединения.
5. `onerror` ловит ошибки в WebSocket-соединении.

```javascript
// Создание подключения к WebSocket серверу
const socket = new WebSocket('ws://localhost:5000');

// Событие на подключение
socket.onopen = function(event) {
    console.log('Connected to WebSocket server');
    // Отправка сообщения серверу
    socket.send('Hello, Server!');
};

// Событие получения сообщения от сервера
socket.onmessage = function(event) {
    console.log('Message from server: ', event.data);
};

// Событие на закрытие соединения
socket.onclose = function(event) {
    console.log('Disconnected from WebSocket server');
};

// Обработка ошибок
socket.onerror = function(error) {
    console.error('WebSocket error: ', error);
};
```

### Outer links: