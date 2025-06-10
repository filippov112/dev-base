
# Наблюдатель

**Наблюдатель (Observer)** — это поведенческий паттерн, который позволяет одному объекту (издателю) уведомлять другие объекты (наблюдателей) об изменениях его состояния.

📌 Когда может понадобиться:  
- Если требуется реализовать механизм подписки на события.  
- Если один объект должен автоматически оповещать другие без жёсткой связи между ними.  
- Если система должна быть гибкой и расширяемой, позволяя динамически добавлять подписчиков.

📌 Суть паттерна:  
Объект-издатель хранит список подписчиков и уведомляет их при изменении состояния. Подписчики реализуют общий интерфейс, что позволяет издателю работать с ними, не зная их конкретные типы.

📌 Выгода:  
✔️ Ослабляет зависимость между объектами  
✔️ Позволяет динамически добавлять или удалять подписчиков  
✔️ Улучшает поддержку расширений и изменений  

---
#### Простой пример на C#:
В этом коде `WeatherStation` уведомляет всех подписчиков (`INotification`) об изменении температуры. 

```csharp
// Интерфейс наблюдателя
interface INotification
{
    void Update(float temperature);
}

// Класс издателя
class WeatherStation
{
    private List<INotification> observers = new();
    private float temperature;

    public void AddObserver(INotification observer) => observers.Add(observer);
    public void RemoveObserver(INotification observer) => observers.Remove(observer);

    public void SetTemperature(float temp)
    {
        temperature = temp;
        NotifyObservers();
    }

    private void NotifyObservers()
    {
        foreach (var observer in observers)
            observer.Update(temperature);
    }
}

// Конкретный наблюдатель
class PhoneDisplay : INotification
{
    public void Update(float temperature) =>
        Console.WriteLine($"📱 Телефонный дисплей: Температура изменилась на {temperature}°C");
}

// Другой конкретный наблюдатель
class LaptopDisplay : INotification
{
    public void Update(float temperature) =>
        Console.WriteLine($"💻 Ноутбук: Новая температура {temperature}°C");
}

// Использование
class Program
{
    static void Main()
    {
        WeatherStation station = new WeatherStation();
        PhoneDisplay phone = new PhoneDisplay();
        LaptopDisplay laptop = new LaptopDisplay();

        station.AddObserver(phone);
        station.AddObserver(laptop);

        station.SetTemperature(25.5f); // Оповещение наблюдателей
    }
}
```

### Outer links:
https://metanit.com/sharp/patterns/3.2.php