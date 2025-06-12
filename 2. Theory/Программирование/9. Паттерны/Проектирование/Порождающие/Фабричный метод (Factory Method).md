#theory #theory-sys_design
 
---
**Фабричный метод (Factory Method)** — это порождающий паттерн, для создания объектов без указания их конкретного класса. Вместо этого объект создаётся через метод, который можно переопределить в подклассах.

📌 Когда может понадобиться:  
- Если в коде требуется создавать объекты, но заранее неизвестно, экземпляры каких классов понадобятся. 
- Или если нужно упростить процесс создания объектов, отделив его от основной логики программы.

📌 Суть паттерна:  
Определяется абстрактный метод (или виртуальный метод в базовом классе), который делегирует создание объектов подклассам. Таким образом, можно легко менять создаваемые объекты, не изменяя код клиента.

📌 Выгода:  
✔️ Код становится гибче и удобнее для расширения  
✔️ Убирается жёсткая привязка к конкретным классам  
✔️ Можно централизовать логику создания объектов

---
#### Простой пример на C#:
В этом коде фабричный метод `CreateTransport()` определён в `Logistics`, а подклассы `RoadLogistics` и `SeaLogistics` решают, какой транспорт создать. Клиентский код не зависит от конкретных классов транспорта, что делает систему более гибкой.

```csharp
// Абстрактный продукт
abstract class Transport
{
    public abstract void Deliver();
}

// Конкретные продукты
class Truck : Transport
{
    public override void Deliver() => Console.WriteLine("Доставка грузовиком 🚛");
}

class Ship : Transport
{
    public override void Deliver() => Console.WriteLine("Доставка кораблём 🚢");
}

// Абстрактный создатель (с фабричным методом)
abstract class Logistics
{
    public abstract Transport CreateTransport();
}

// Конкретные создатели
class RoadLogistics : Logistics
{
    public override Transport CreateTransport() => new Truck();
}

class SeaLogistics : Logistics
{
    public override Transport CreateTransport() => new Ship();
}

// Использование
class Program
{
    static void Main()
    {
        Logistics logistics = new RoadLogistics(); // Можно легко заменить на SeaLogistics
        Transport transport = logistics.CreateTransport();
        transport.Deliver();
    }
}
```

### Outer links:
https://metanit.com/sharp/patterns/2.1.php