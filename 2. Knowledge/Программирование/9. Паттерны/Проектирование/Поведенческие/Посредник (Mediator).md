#dev_pattern
# Посредник

**Посредник (Mediator)** — это поведенческий паттерн, который уменьшает зависимость между объектами, позволяя им общаться через централизованный объект-посредник.

📌 Когда может понадобиться:  
- Если множество объектов взаимодействует друг с другом напрямую, создавая запутанные зависимости.  
- Если нужно централизовать логику взаимодействия между объектами.  
- Если необходимо упростить поддержку и модификацию кода, разделив участников взаимодействия.

📌 Суть паттерна:  
Вместо того чтобы объекты общались напрямую, они передают сообщения посреднику. Посредник управляет их взаимодействием, избавляя классы от лишних зависимостей.

📌 Выгода:  
✔️ Уменьшает связанность компонентов системы  
✔️ Облегчает расширение и поддержку кода  
✔️ Централизует управление взаимодействием  

---
#### Простой пример на C#:
В этом коде посредник `ChatMediator` управляет общением между пользователями `User`. Пользователи не отправляют сообщения друг другу напрямую, а используют посредника.

```csharp
// Интерфейс посредника
interface IChatMediator
{
    void SendMessage(string message, User sender);
}

// Конкретный посредник
class ChatMediator : IChatMediator
{
    private List<User> users = new();

    public void RegisterUser(User user) => users.Add(user);

    public void SendMessage(string message, User sender)
    {
        foreach (var user in users)
        {
            if (user != sender) // Не отправляем сообщение самому себе
                user.ReceiveMessage(message);
        }
    }
}

// Класс участника
class User
{
    public string Name { get; }
    private IChatMediator mediator;

    public User(string name, IChatMediator mediator)
    {
        Name = name;
        this.mediator = mediator;
        mediator.RegisterUser(this);
    }

    public void SendMessage(string message)
    {
        Console.WriteLine($"{Name} отправляет: {message}");
        mediator.SendMessage(message, this);
    }

    public void ReceiveMessage(string message)
    {
        Console.WriteLine($"{Name} получил: {message}");
    }
}

// Использование
class Program
{
    static void Main()
    {
        ChatMediator chat = new();
        User alice = new("Alice", chat);
        User bob = new("Bob", chat);
        User charlie = new("Charlie", chat);

        alice.SendMessage("Всем привет! 👋");
        bob.SendMessage("Привет, Alice! 😊");
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.9.php