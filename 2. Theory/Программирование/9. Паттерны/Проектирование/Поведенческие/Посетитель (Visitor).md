
# Посетитель

**Посетитель (Visitor)** — это поведенческий паттерн, который позволяет добавлять новые операции к объектам, не изменяя их классы. Вместо того чтобы добавлять функциональность в сами классы объектов, создаётся класс посетителя, который "посещает" объекты и выполняет операции.

📌 Когда может понадобиться:  
- Если нужно добавить новые операции для элементов сложной структуры объектов, не меняя сами объекты.  
- Когда объекты в структуре имеют разные типы и нужно выполнить разные действия в зависимости от типа объекта.  
- Когда требуется сохранить разделение логики работы с объектами и их классов.

📌 Суть паттерна:  
Определяется интерфейс `Visitor`, который содержит методы для работы с каждым типом элементов. Каждый элемент структуры объектов реализует метод `Accept()`, который принимает посетителя и делегирует ему выполнение операции.

📌 Выгода:  
✔️ Легкость добавления новых операций без изменения классов объектов  
✔️ Упрощение кода за счёт разделения логики работы с объектами и их структур  
✔️ Уменьшение количества условий и проверок типов в коде

---
#### Простой пример на C#:
В этом коде создаются разные элементы (`Book` и `DVD`), и каждый из них имеет метод `Accept()`, который принимает посетителя и вызывает соответствующий метод для этого элемента.

```csharp
// Интерфейс посетителя
interface IVisitor
{
    void Visit(Book book);
    void Visit(DVD dvd);
}

// Абстрактный элемент
abstract class Product
{
    public string Name { get; set; }

    public abstract void Accept(IVisitor visitor);
}

// Конкретный элемент
class Book : Product
{
    public int Pages { get; set; }

    public override void Accept(IVisitor visitor) => visitor.Visit(this);
}

// Другой конкретный элемент
class DVD : Product
{
    public int Duration { get; set; }

    public override void Accept(IVisitor visitor) => visitor.Visit(this);
}

// Конкретный посетитель
class PriceCalculator : IVisitor
{
    public void Visit(Book book) => Console.WriteLine($"Цена книги '{book.Name}' = 15$");
    public void Visit(DVD dvd) => Console.WriteLine($"Цена DVD '{dvd.Name}' = 20$");
}

// Использование
class Program
{
    static void Main()
    {
        var book = new Book { Name = "C# for Beginners", Pages = 300 };
        var dvd = new DVD { Name = "C# Tutorial", Duration = 120 };

        var priceCalculator = new PriceCalculator();
        
        book.Accept(priceCalculator);  // Цена книги
        dvd.Accept(priceCalculator);   // Цена DVD
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.11.php