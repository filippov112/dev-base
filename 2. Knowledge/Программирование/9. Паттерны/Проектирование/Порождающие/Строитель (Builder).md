#dev_pattern
# Строитель

**Строитель (Builder)** — это порождающий паттерн, который позволяет пошагово создавать сложные объекты, отделяя процесс конструирования от структуры объекта.
[Плавный строитель (Fluent builder)](2.%20Knowledge/Программирование/9.%20Паттерны/Проектирование/Порождающие/Плавный%20строитель%20(Fluent%20builder).md)

📌 Когда может понадобиться:  
- Если объект имеет много параметров и возможных конфигураций.   
- Когда процесс создания нового объекта не должен зависеть от того, из каких частей этот объект состоит и как эти части связаны между собой
- Когда необходимо обеспечить получение различных вариаций объекта в процессе его создания

📌 Суть паттерна:  
Определяется класс-строитель с методами для пошаговой конфигурации объекта. Вместо громоздкого конструктора, клиент вызывает нужные методы, настраивая объект в удобном порядке.

📌 Выгода:  
✔️ Улучшает читаемость и удобство создания сложных объектов  
✔️ Избегает перегруженных конструкторов  
✔️ Упрощает поддержку кода  

---
#### Простой пример на C#:
В этом коде `BurgerBuilder` позволяет пошагово собирать бургер с разными ингредиентами. Это делает код более понятным и гибким.

```csharp
// Класс, который мы строим
class Burger
{
    public string Bun { get; set; }
    public string Patty { get; set; }
    public bool Cheese { get; set; }
    public bool Lettuce { get; set; }

    public override string ToString() =>
        $"Burger with {Bun} bun, {Patty} patty, " +
        $"{(Cheese ? "cheese, " : "")}{(Lettuce ? "lettuce" : "")}".TrimEnd(',', ' ');
}

// Строитель для пошагового создания бургера
class BurgerBuilder
{
    private Burger _burger = new();

    public BurgerBuilder SetBun(string bun)
    {
        _burger.Bun = bun;
        return this;
    }

    public BurgerBuilder SetPatty(string patty)
    {
        _burger.Patty = patty;
        return this;
    }

    public BurgerBuilder AddCheese()
    {
        _burger.Cheese = true;
        return this;
    }

    public BurgerBuilder AddLettuce()
    {
        _burger.Lettuce = true;
        return this;
    }

    public Burger Build() => _burger;
}

// Использование
class Program
{
    static void Main()
    {
        Burger burger = new BurgerBuilder()
            .SetBun("Sesame")
            .SetPatty("Beef")
            .AddCheese()
            .Build();

        Console.WriteLine(burger);
    }
}
````

### Outer links:

[https://metanit.com/sharp/patterns/2.5.php](https://metanit.com/sharp/patterns/2.5.php)