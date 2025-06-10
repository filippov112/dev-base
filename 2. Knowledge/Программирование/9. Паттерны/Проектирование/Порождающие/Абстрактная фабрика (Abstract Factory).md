#dev_pattern
# Абстрактная фабрика

**Абстрактная фабрика (Abstract Factory)** — это порождающий паттерн, который предоставляет интерфейс для создания семейств связанных объектов без указания их конкретных классов. Каждый класс семейства объектов можно создать с помощью своей фабрики.

📌 Когда может понадобиться:  
- Если система должна работать с несколькими семействами объектов, но без привязки к их конкретным классам.  
- Если требуется обеспечить совместимость объектов внутри одного семейства, но не зависеть от их реализации.

📌 Суть паттерна:  
Абстрактная фабрика определяет интерфейс для создания продуктов, но не самих продуктов. Каждое семейство продуктов реализует свои фабрики, которые знают, как создавать соответствующие объекты.

📌 Выгода:  
✔️ Упрощается создание и управление связанными объектами  
✔️ Обеспечивается независимость от конкретных классов объектов  
✔️ Можно легко добавлять новые семейства объектов, не нарушая существующий код

---
#### Простой пример на C#:
В этом коде абстрактная фабрика `FurnitureFactory` создаёт мебель: стулья и столы, но конкретные фабрики `ModernFurnitureFactory` и `VictorianFurnitureFactory` создают свои конкретные стили мебели. Клиентский код не зависит от конкретных типов мебели.

```csharp
// Абстрактные продукты
abstract class Chair
{
    public abstract void SitOn();
}

abstract class Table
{
    public abstract void Use();
}

// Конкретные продукты
class ModernChair : Chair
{
    public override void SitOn() => Console.WriteLine("Сидеть на современном стуле");
}

class VictorianChair : Chair
{
    public override void SitOn() => Console.WriteLine("Сидеть на викторианском стуле");
}

class ModernTable : Table
{
    public override void Use() => Console.WriteLine("Использовать современный стол");
}

class VictorianTable : Table
{
    public override void Use() => Console.WriteLine("Использовать викторианский стол");
}

// Абстрактная фабрика
abstract class FurnitureFactory
{
    public abstract Chair CreateChair();
    public abstract Table CreateTable();
}

// Конкретные фабрики
class ModernFurnitureFactory : FurnitureFactory
{
    public override Chair CreateChair() => new ModernChair();
    public override Table CreateTable() => new ModernTable();
}

class VictorianFurnitureFactory : FurnitureFactory
{
    public override Chair CreateChair() => new VictorianChair();
    public override Table CreateTable() => new VictorianTable();
}

// Использование
class Program
{
    static void Main()
    {
        FurnitureFactory factory = new ModernFurnitureFactory(); // Можно легко заменить на VictorianFurnitureFactory
        Chair chair = factory.CreateChair();
        Table table = factory.CreateTable();
        
        chair.SitOn();
        table.Use();
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/2.2.php