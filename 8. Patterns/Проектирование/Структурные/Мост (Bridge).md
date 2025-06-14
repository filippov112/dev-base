#theory #theory-sys_design
 
---
**Мост (Bridge)** — это структурный паттерн, который разделяет абстракцию и её реализацию, позволяя изменять их независимо друг от друга. Паттерн полезен, когда нужно изменять абстракцию и реализацию, не затрагивая друг друга.

📌 Когда может понадобиться:  
- Если нужно разделить интерфейс и его реализацию, чтобы их можно было изменять или расширять независимо.  
- Если есть несколько вариантов реализации, и нужно комбинировать их с разными абстракциями.

📌 Суть паттерна:  
Определяются абстракция и её реализация как отдельные компоненты, при этом абстракция делегирует работу реализации. Это позволяет изменять обе части без взаимного воздействия.

📌 Выгода:  
✔️ Улучшение гибкости и расширяемости системы  
✔️ Позволяет независимое изменение абстракции и реализации  
✔️ Упрощает поддержку и расширение кода

---
#### Простой пример на C#:
В этом коде абстракция `Shape` делегирует работу реализации в `DrawingAPI`. Таким образом, можно менять способы рисования (реализацию), не изменяя абстракцию.

```csharp
// Абстракция
abstract class Shape
{
    protected IDrawingAPI drawingAPI;

    protected Shape(IDrawingAPI drawingAPI)
    {
        this.drawingAPI = drawingAPI;
    }

    public abstract void Draw(); // Абстрактный метод для рисования
}

// Реализация 1
interface IDrawingAPI
{
    void DrawCircle(double x, double y, double radius);
}

class DrawingAPI1 : IDrawingAPI
{
    public void DrawCircle(double x, double y, double radius) =>
        Console.WriteLine($"Рисую круг через API 1: ({x},{y}), Радиус: {radius}");
}

// Реализация 2
class DrawingAPI2 : IDrawingAPI
{
    public void DrawCircle(double x, double y, double radius) =>
        Console.WriteLine($"Рисую круг через API 2: ({x},{y}), Радиус: {radius}");
}

// Конкретная абстракция
class Circle : Shape
{
    private double x, y, radius;

    public Circle(double x, double y, double radius, IDrawingAPI drawingAPI)
        : base(drawingAPI)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public override void Draw() => drawingAPI.DrawCircle(x, y, radius);
}

// Использование
class Program
{
    static void Main()
    {
        Shape circle1 = new Circle(5, 10, 15, new DrawingAPI1());
        Shape circle2 = new Circle(20, 30, 10, new DrawingAPI2());
        
        circle1.Draw();
        circle2.Draw();
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/4.6.php