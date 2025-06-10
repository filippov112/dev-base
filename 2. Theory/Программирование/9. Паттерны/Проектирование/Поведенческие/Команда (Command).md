
# Команда

**Команда (Command)** — это поведенческий паттерн, который превращает запрос в объект. Это позволяет ставить запросы в очередь, отменять или логировать их.

📌 Когда может понадобиться:  
- Если нужно передавать операции в виде объектов, например, в очереди задач.  
- Если требуется логировать и откатывать выполненные команды.  
- Если один и тот же запрос должен выполняться разными способами.

📌 Суть паттерна:  
Определяется интерфейс команды с методом `Execute()`. Конкретные классы команд реализуют этот метод, инкапсулируя операцию. Команды передаются объекту-исполнителю (Invoker), который вызывает их выполнение.

📌 Выгода:  
✔️ Разделяет отправителя и получателя запроса  
✔️ Позволяет легко добавлять новые команды  
✔️ Упрощает реализацию undo/redo  

---
#### Простой пример на C#:
В этом коде `Light` — получатель команды, `ICommand` — интерфейс команд, `TurnOnCommand` и `TurnOffCommand` — конкретные команды, а `RemoteControl` выполняет команды.

```csharp
// Интерфейс команды
interface ICommand
{
    void Execute();
}

// Получатель команды
class Light
{
    public void TurnOn() => Console.WriteLine("💡 Свет включен");
    public void TurnOff() => Console.WriteLine("🌑 Свет выключен");
}

// Конкретные команды
class TurnOnCommand : ICommand
{
    private Light _light;
    
    public TurnOnCommand(Light light) => _light = light;
    
    public void Execute() => _light.TurnOn();
}

class TurnOffCommand : ICommand
{
    private Light _light;
    
    public TurnOffCommand(Light light) => _light = light;
    
    public void Execute() => _light.TurnOff();
}

// Отправитель команды
class RemoteControl
{
    private ICommand _command;
    
    public void SetCommand(ICommand command) => _command = command;
    
    public void PressButton() => _command.Execute();
}

// Использование
class Program
{
    static void Main()
    {
        Light light = new Light();
        RemoteControl remote = new RemoteControl();

        remote.SetCommand(new TurnOnCommand(light));
        remote.PressButton();

        remote.SetCommand(new TurnOffCommand(light));
        remote.PressButton();
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.3.php