#theory #theory-sys_design
 
---
**Состояние (State)** — это поведенческий паттерн, который позволяет объекту изменять своё поведение в зависимости от внутреннего состояния. Вместо множества `if` и `switch` логика состояний выносится в отдельные классы.

Отличие от паттерна [Стратегия (Strategy)](8.%20Patterns/Проектирование/Поведенческие/Стратегия%20(Strategy).md) в том, что в последней мы сами управляем вариациями алгоритма поведения объекта, а в State объект делает этот выбор без нас. Strategy отвечает за вариативность выполнения одной задачи, а State моделирует изменения самого объекта.

📌 Когда может понадобиться:  
- Если у объекта есть несколько состояний, и его поведение меняется в зависимости от текущего состояния.  
- Если код перегружен условными конструкциями (`if-else`, `switch-case`) для обработки различных состояний.  
- Если нужно чётко разделить логику работы состояний и сам объект.

📌 Суть паттерна:  
Создаётся базовый класс (или интерфейс) для состояний, определяющий общие методы. Конкретные состояния реализуют этот интерфейс и содержат логику для каждого из состояний. Объект-контекст хранит ссылку на текущее состояние и делегирует ему выполнение действий.

📌 Выгода:  
✔️ Убирает громоздкие условные конструкции  
✔️ Упрощает поддержку и добавление новых состояний  
✔️ Инкапсулирует логику состояний в отдельных классах  

---
#### Простой пример на C#:
В этом коде `TrafficLight` изменяет своё поведение в зависимости от текущего состояния (`RedState`, `YellowState`, `GreenState`).

```csharp
// Интерфейс состояния
interface ITrafficLightState
{
    void Handle(TrafficLight context);
}

// Конкретное состояние - Красный свет
class RedState : ITrafficLightState
{
    public void Handle(TrafficLight context)
    {
        Console.WriteLine("Красный свет 🔴. Ждите.");
        context.SetState(new GreenState());
    }
}

// Конкретное состояние - Зелёный свет
class GreenState : ITrafficLightState
{
    public void Handle(TrafficLight context)
    {
        Console.WriteLine("Зелёный свет 🟢. Можно идти.");
        context.SetState(new YellowState());
    }
}

// Конкретное состояние - Жёлтый свет
class YellowState : ITrafficLightState
{
    public void Handle(TrafficLight context)
    {
        Console.WriteLine("Жёлтый свет 🟡. Готовьтесь.");
        context.SetState(new RedState());
    }
}

// Контекст, хранящий текущее состояние
class TrafficLight
{
    private ITrafficLightState _state;

    public TrafficLight(ITrafficLightState state) => _state = state;

    public void SetState(ITrafficLightState state) => _state = state;

    public void Request() => _state.Handle(this);
}

// Использование
class Program
{
    static void Main()
    {
        TrafficLight light = new TrafficLight(new RedState());

        for (int i = 0; i < 5; i++)
        {
            light.Request();
            Thread.Sleep(1000);
        }
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.6.php