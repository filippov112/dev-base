
# Стратегия

**Стратегия (Strategy)** — это поведенческий паттерн, который позволяет изменять алгоритм поведения объекта во время выполнения, не изменяя его код. Вместо этого алгоритм инкапсулируется в отдельные классы и передаётся объекту динамически.

📌 Когда может понадобиться:  
- Если есть несколько вариантов поведения, которые нужно легко переключать.  
- Если код содержит много `if-else` или `switch-case` для выбора алгоритма.  
- Если поведение объекта должно быть настраиваемым и изменяемым без изменения самого класса.

📌 Суть паттерна:  
Определяется общий интерфейс для всех стратегий, затем создаются конкретные реализации. Объект-контекст хранит ссылку на текущую стратегию и делегирует ей выполнение работы. Таким образом, можно легко подменять алгоритмы.

📌 Выгода:  
✔️ Упрощает поддержку и расширение кода  
✔️ Избавляет от громоздких условных конструкций  
✔️ Позволяет динамически менять поведение объекта  

---
#### Простой пример на C#:
В этом коде интерфейс `IStrategy` описывает общий метод `Execute()`, а классы `ConcreteStrategyA` и `ConcreteStrategyB` реализуют разные варианты поведения. Объект `Context` принимает стратегию и выполняет её.

```csharp
// Интерфейс стратегии
interface IStrategy
{
    void Execute();
}

// Конкретные стратегии
class ConcreteStrategyA : IStrategy
{
    public void Execute() => Console.WriteLine("Выполнение стратегии A 🚀");
}

class ConcreteStrategyB : IStrategy
{
    public void Execute() => Console.WriteLine("Выполнение стратегии B ⚡");
}

// Контекст, использующий стратегию
class Context
{
    private IStrategy _strategy;

    public Context(IStrategy strategy) => _strategy = strategy;

    public void SetStrategy(IStrategy strategy) => _strategy = strategy;

    public void ExecuteStrategy() => _strategy.Execute();
}

// Использование
class Program
{
    static void Main()
    {
        Context context = new Context(new ConcreteStrategyA()); // Используем стратегию A
        context.ExecuteStrategy();

        context.SetStrategy(new ConcreteStrategyB()); // Переключаемся на стратегию B
        context.ExecuteStrategy();
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.1.php