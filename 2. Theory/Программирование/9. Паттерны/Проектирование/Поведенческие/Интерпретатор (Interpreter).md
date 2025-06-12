#theory #theory-sys_design
 
---
**Интерпретатор (Interpreter)** — это поведенческий паттерн, который используется для обработки грамматики или языка. Он позволяет разбирать и исполнять выражения, представленные в виде деревьев или цепочек объектов.

📌 Когда может понадобиться:  
- Если нужно реализовать собственный язык или команды (например, калькулятор, SQL-парсер, обработчик формул).  
- Если выражения в коде часто меняются, и требуется гибкая структура для их обработки.  
- Если необходимо преобразовывать текстовые команды в исполняемые действия.

📌 Суть паттерна:  
Определяется интерфейс `IExpression`, где реализуется метод `Interpret()`. Конкретные классы выражений (`NumberExpression`, `AddExpression`) интерпретируют себя, используя переданный контекст. Это позволяет обрабатывать сложные структуры выражений.

📌 Выгода:  
✔️ Упрощает добавление новых типов выражений без изменения существующего кода  
✔️ Позволяет работать с языками и грамматиками в удобном объектно-ориентированном стиле  
✔️ Код становится более читаемым и структурированным  

---
#### Простой пример на C#:
В этом коде реализован интерпретатор для простых математических выражений, складывающий два числа.

```csharp
// Интерфейс выражения
interface IExpression
{
    int Interpret();
}

// Конкретное число
class NumberExpression : IExpression
{
    private int _number;

    public NumberExpression(int number) => _number = number;

    public int Interpret() => _number;
}

// Выражение сложения
class AddExpression : IExpression
{
    private IExpression _left, _right;

    public AddExpression(IExpression left, IExpression right)
    {
        _left = left;
        _right = right;
    }

    public int Interpret() => _left.Interpret() + _right.Interpret();
}

// Использование
class Program
{
    static void Main()
    {
        IExpression left = new NumberExpression(5);
        IExpression right = new NumberExpression(10);
        IExpression sum = new AddExpression(left, right);
        
        Console.WriteLine($"Результат: {sum.Interpret()}"); // 15
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.8.php