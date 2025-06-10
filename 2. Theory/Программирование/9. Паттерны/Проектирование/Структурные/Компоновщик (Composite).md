
# Компоновщик

**Компоновщик (Composite)** — это структурный паттерн, который позволяет объединить объекты в древовидную структуру и работать с ней как с единым объектом. Он позволяет клиенту работать с одиночными объектами и их группами одинаковым образом.

📌 Когда может понадобиться:  
- Если нужно работать с иерархией объектов, например, при построении сложных графов или деревьев.  
- Если необходимо управлять как одиночными объектами, так и их коллекциями (группами) одинаково.  
- Когда структура объектов должна быть гибкой и легко изменяемой.

📌 Суть паттерна:  
Создаются абстрактные компоненты, которые могут быть как простыми объектами, так и композициями этих объектов. Важно, что и те, и другие могут быть обработаны одинаково, что упрощает работу с иерархиями.

📌 Выгода:  
✔️ Упрощает работу с объектами, представленными в виде деревьев  
✔️ Позволяет клиенту использовать объекты и группы объектов одинаково  
✔️ Увеличивает гибкость системы

---
#### Простой пример на C#:
В этом примере классы `Leaf` и `Composite` реализуют общий интерфейс `Component`. Класс `Composite` может содержать другие компоненты, включая другие `Composite` объекты, что позволяет создавать иерархию.

```csharp
// Абстрактный компонент
interface IComponent
{
    void Display();
}

// Листовой элемент (Одиночный объект)
class Leaf : IComponent
{
    private string _name;
    public Leaf(string name) => _name = name;

    public void Display() => Console.WriteLine($"Листовой элемент: {_name}");
}

// Композитный элемент (Группа объектов)
class Composite : IComponent
{
    private List<IComponent> _children = new List<IComponent>();

    public void Add(IComponent component) => _children.Add(component);

    public void Display()
    {
        Console.WriteLine("Композитный элемент:");
        foreach (var child in _children)
        {
            child.Display();
        }
    }
}

// Использование
class Program
{
    static void Main()
    {
        IComponent leaf1 = new Leaf("Лист 1");
        IComponent leaf2 = new Leaf("Лист 2");

        Composite composite = new Composite();
        composite.Add(leaf1);
        composite.Add(leaf2);

        // Можно добавить другие Composite объекты в иерархию
        IComponent leaf3 = new Leaf("Лист 3");
        Composite nestedComposite = new Composite();
        nestedComposite.Add(leaf3);

        composite.Add(nestedComposite);

        // Отображение всей иерархии
        composite.Display();
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/4.4.php