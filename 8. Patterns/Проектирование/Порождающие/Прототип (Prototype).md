#theory #theory-sys_design
 
---
**Прототип (Prototype)** — это порождающий паттерн, который позволяет копировать объекты без привязки к их конкретным классам. Вместо создания нового объекта через `new` используется клонирование существующего экземпляра.

📌 Когда может понадобиться:  
- Если создание объекта сложное или дорогостоящее, а нужно создать его копию.  
- Если нужно сохранить исходный объект неизменным и работать с его копиями.  
- Если система должна быть гибкой и поддерживать клонирование без указания конкретных классов.

📌 Суть паттерна:  
Определяется интерфейс или базовый класс с методом `Clone()`. Конкретные классы реализуют этот метод, обеспечивая копирование своих данных. Клиентский код может работать с клонированными объектами, не зная их точный класс.

📌 Выгода:  
✔️ Позволяет копировать сложные объекты без зависимости от их классов  
✔️ Снижает затраты на создание новых объектов  
✔️ Обеспечивает удобную работу с изменяемыми объектами  

---
#### Простой пример на C#:
В этом коде у базового класса `Shape` есть метод `Clone()`, который реализуется в `Rectangle` и `Circle`. Благодаря этому можно копировать объекты, не зная их точный тип.

```csharp
// Интерфейс для клонирования
interface IPrototype
{
    IPrototype Clone();
}

// Абстрактный класс с базовой логикой
abstract class Shape : IPrototype
{
    public string Color { get; set; }

    public abstract IPrototype Clone();
}

// Конкретный класс
class Rectangle : Shape
{
    public int Width { get; set; }
    public int Height { get; set; }

    public override IPrototype Clone() =>
        new Rectangle { Width = this.Width, Height = this.Height, Color = this.Color };
}

// Другой конкретный класс
class Circle : Shape
{
    public int Radius { get; set; }

    public override IPrototype Clone() =>
        new Circle { Radius = this.Radius, Color = this.Color };
}

// Использование
class Program
{
    static void Main()
    {
        Rectangle rect1 = new Rectangle { Width = 10, Height = 20, Color = "Red" };
        Rectangle rect2 = (Rectangle)rect1.Clone(); // Создаём копию
        
        Console.WriteLine($"rect1: {rect1.Width}x{rect1.Height}, Color: {rect1.Color}");
        Console.WriteLine($"rect2: {rect2.Width}x{rect2.Height}, Color: {rect2.Color}");
    }
}
````

### Outer links:
[https://metanit.com/sharp/patterns/2.4.php](https://metanit.com/sharp/patterns/2.4.php)