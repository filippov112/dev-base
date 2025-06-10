
# Приспособленец

**Приспособленец (Flyweight)** — это структурный паттерн, который позволяет уменьшить потребление памяти за счёт использования общих объектов, разделяемых между множеством других объектов, вместо создания новых экземпляров. Он особенно полезен для работы с большими объемами данных или объектов, которые могут повторяться.

📌 Когда может понадобиться:  
- Если в системе создаётся большое количество объектов, занимающих много памяти.
- Когда нужно снизить нагрузку на память, используя общий набор данных для всех объектов.
- Когда объекты содержат общие свойства, которые можно вынести в отдельный класс для экономии ресурсов.

📌 Суть паттерна:  
Паттерн делит объекты на две части: внешнее состояние (неизменяемое и общедоступное) и внутреннее состояние (индивидуальное для каждого объекта). Внешнее состояние делится между всеми объектами, а внутреннее состояние хранится индивидуально.

📌 Выгода:  
✔️ Экономия памяти при хранении объектов  
✔️ Ускорение работы системы за счёт уменьшения количества объектов  
✔️ Упрощение управления большими объемами данных

---
#### Простой пример на C#:
В этом коде паттерн **Приспособленец** используется для создания объектов деревьев, где характеристики дерева, такие как тип и цвет, делятся между всеми экземплярами, а индивидуальные данные (например, позиция) сохраняются отдельно.

```csharp
// Приспособленец: общий объект
class TreeType
{
    public string Name { get; }
    public string Color { get; }

    public TreeType(string name, string color)
    {
        Name = name;
        Color = color;
    }

    public void Display(int x, int y)
    {
        Console.WriteLine($"Tree: {Name}, Color: {Color}, Location: ({x}, {y})");
    }
}

// Контекст: объекты, которые могут менять внутреннее состояние
class Tree
{
    public TreeType Type { get; }
    public int X { get; }
    public int Y { get; }

    public Tree(TreeType type, int x, int y)
    {
        Type = type;
        X = x;
        Y = y;
    }

    public void Display()
    {
        Type.Display(X, Y);
    }
}

// Фабрика для создания и хранения экземпляров деревьев
class TreeFactory
{
    private readonly Dictionary<string, TreeType> _treeTypes = new();

    public TreeType GetTreeType(string name, string color)
    {
        string key = $"{name}-{color}";
        if (!_treeTypes.ContainsKey(key))
        {
            _treeTypes[key] = new TreeType(name, color);
        }
        return _treeTypes[key];
    }
}

// Использование
class Program
{
    static void Main()
    {
        TreeFactory treeFactory = new TreeFactory();

        // Создание деревьев с общими типами
        TreeType oak = treeFactory.GetTreeType("Oak", "Green");
        TreeType pine = treeFactory.GetTreeType("Pine", "Dark Green");

        Tree tree1 = new Tree(oak, 10, 20);
        Tree tree2 = new Tree(pine, 30, 40);
        Tree tree3 = new Tree(oak, 50, 60);

        tree1.Display();
        tree2.Display();
        tree3.Display();
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/4.7.php