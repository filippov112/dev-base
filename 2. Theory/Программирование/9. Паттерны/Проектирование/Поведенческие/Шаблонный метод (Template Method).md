#theory #theory-sys_design
 
---
**Шаблонный метод (Template Method)** — это поведенческий паттерн, который позволяет определить основу алгоритма в базовом классе и делегировать конкретные шаги подклассам.

📌 Когда может понадобиться:  
- Если нужно задать общий алгоритм выполнения, но отдельные шаги могут отличаться в зависимости от реализации.  
- Если есть несколько классов с похожей логикой, но с небольшими отличиями.  
- Если важно централизовать управление алгоритмом, избегая дублирования кода.

📌 Суть паттерна:  
Определяется абстрактный базовый класс с методом-скелетом (`TemplateMethod`), который описывает последовательность шагов алгоритма. Некоторые из этих шагов делаются абстрактными или виртуальными, чтобы подклассы могли их переопределять.

📌 Выгода:  
✔️ Избегается дублирование кода, так как общая структура алгоритма находится в одном месте  
✔️ Код становится более удобным для поддержки, так как логика алгоритма централизована  
✔️ Можно легко добавлять новые вариации алгоритма, создавая новые подклассы  

---
#### Простой пример на C#:
В этом коде метод `PrepareDrink()` в `Beverage` задаёт общий процесс приготовления напитка, а подклассы `Tea` и `Coffee` реализуют конкретные шаги.

```csharp
// Абстрактный класс с шаблонным методом
abstract class Beverage
{
    // Шаблонный метод, задающий последовательность шагов
    public void PrepareDrink()
    {
        BoilWater();
        Brew();
        PourIntoCup();
        AddCondiments();
    }

    private void BoilWater() => Console.WriteLine("Кипячение воды 🔥");
    private void PourIntoCup() => Console.WriteLine("Наливание в чашку ☕");

    // Абстрактные методы для переопределения в подклассах
    protected abstract void Brew();
    protected abstract void AddCondiments();
}

// Конкретный подкласс
class Tea : Beverage
{
    protected override void Brew() => Console.WriteLine("Заваривание чая 🍃");
    protected override void AddCondiments() => Console.WriteLine("Добавление лимона 🍋");
}

// Другой конкретный подкласс
class Coffee : Beverage
{
    protected override void Brew() => Console.WriteLine("Заваривание кофе ☕");
    protected override void AddCondiments() => Console.WriteLine("Добавление сахара и молока 🥛");
}

// Использование
class Program
{
    static void Main()
    {
        Beverage tea = new Tea();
        Console.WriteLine("Готовим чай:");
        tea.PrepareDrink();

        Console.WriteLine("\nГотовим кофе:");
        Beverage coffee = new Coffee();
        coffee.PrepareDrink();
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.4.php