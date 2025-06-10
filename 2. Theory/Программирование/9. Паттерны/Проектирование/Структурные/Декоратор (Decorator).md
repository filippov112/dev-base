
# Декоратор

**Декоратор (Decorator)** — это структурный паттерн, который позволяет динамически добавлять новые обязанности объектам, оборачивая их в другие объекты. Это даёт возможность расширять функциональность объектов без изменения их исходного кода.

📌 Когда может понадобиться:  
- Если нужно расширить функциональность объектов, но без изменения их класса.  
- Когда необходимо добавлять новые возможности объектам поэтапно, без создания множества подклассов.  
- Если нужно иметь возможность комбинировать разные функциональности.

📌 Суть паттерна:  
Создаётся абстракция, которая представляет собой интерфейс или класс, который оборачивает объект. Такой объект может добавлять новый функционал без изменений в оригинальном классе, сохраняя совместимость с клиентским кодом.

📌 Выгода:  
✔️ Удобство добавления новых функциональностей без изменения исходных классов  
✔️ Возможность гибко комбинировать декораторы для получения нужного функционала  
✔️ Уменьшение количества подклассов и дублирования кода

---
#### Простой пример на C#:
В этом коде используется декоратор для расширения функционала базового объекта `Car`. Сначала создаётся обычный автомобиль, а затем добавляются различные улучшения, такие как дополнительный функционал для комфортной поездки.

```csharp
// Интерфейс для автомобиля
interface ICar
{
    void Assemble();
}

// Конкретный класс автомобиля
class BasicCar : ICar
{
    public void Assemble() => Console.WriteLine("Сборка базового автомобиля 🚗");
}

// Абстракция декоратора
abstract class CarDecorator : ICar
{
    protected ICar _car;

    public CarDecorator(ICar car)
    {
        _car = car;
    }

    public virtual void Assemble() => _car.Assemble();
}

// Декоратор для улучшения автомобиля с климат-контролем
class ClimateControlDecorator : CarDecorator
{
    public ClimateControlDecorator(ICar car) : base(car) { }

    public override void Assemble()
    {
        base.Assemble();
        Console.WriteLine("Установка климат-контроля ❄️");
    }
}

// Декоратор для улучшения автомобиля с кожаным салоном
class LeatherSeatsDecorator : CarDecorator
{
    public LeatherSeatsDecorator(ICar car) : base(car) { }

    public override void Assemble()
    {
        base.Assemble();
        Console.WriteLine("Установка кожаных сидений 🛋️");
    }
}

// Использование
class Program
{
    static void Main()
    {
        ICar basicCar = new BasicCar();
        ICar climateCar = new ClimateControlDecorator(basicCar);
        ICar luxuryCar = new LeatherSeatsDecorator(climateCar);

        luxuryCar.Assemble(); // Сначала создаётся базовый автомобиль, потом добавляются улучшения
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/4.1.php