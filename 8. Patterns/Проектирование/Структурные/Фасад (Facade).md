#theory #theory-sys_design
 
---
**Фасад (Facade)** — это структурный паттерн, который предоставляет упрощённый интерфейс для работы с более сложной системой классов, скрывая детали её реализации. 

📌 Когда может понадобиться:  
- Если система имеет сложный интерфейс, и необходимо упростить взаимодействие с ней.  
- Если требуется централизованное управление несколькими подсистемами.

📌 Суть паттерна:  
Создаётся класс, который инкапсулирует работу с несколькими подсистемами и предоставляет простой интерфейс для клиента. Клиент взаимодействует только с фасадом, не погружаясь в детали реализации внутренних компонентов.

📌 Выгода:  
✔️ Упрощается использование сложных систем  
✔️ Снижается зависимость от множества классов и подсистем  
✔️ Делает код чище и удобнее для понимания

---
#### Простой пример на C#:
В этом коде `HomeTheaterFacade` упрощает взаимодействие с системой домашнего кинотеатра, скрывая сложные детали работы с устройствами.

```csharp
// Подсистемы
class AudioSystem
{
    public void On() => Console.WriteLine("Включение аудиосистемы");
    public void Off() => Console.WriteLine("Выключение аудиосистемы");
}

class Projector
{
    public void On() => Console.WriteLine("Включение проектора");
    public void Off() => Console.WriteLine("Выключение проектора");
}

class Screen
{
    public void Lower() => Console.WriteLine("Опускание экрана");
    public void Raise() => Console.WriteLine("Поднимание экрана");
}

// Фасад
class HomeTheaterFacade
{
    private AudioSystem _audioSystem;
    private Projector _projector;
    private Screen _screen;

    public HomeTheaterFacade(AudioSystem audio, Projector projector, Screen screen)
    {
        _audioSystem = audio;
        _projector = projector;
        _screen = screen;
    }

    public void WatchMovie()
    {
        _audioSystem.On();
        _projector.On();
        _screen.Lower();
        Console.WriteLine("Готово к просмотру фильма 🍿🎬");
    }

    public void EndMovie()
    {
        _audioSystem.Off();
        _projector.Off();
        _screen.Raise();
        Console.WriteLine("Конец фильма 🎬");
    }
}

// Использование
class Program
{
    static void Main()
    {
        AudioSystem audio = new AudioSystem();
        Projector projector = new Projector();
        Screen screen = new Screen();

        HomeTheaterFacade homeTheater = new HomeTheaterFacade(audio, projector, screen);

        homeTheater.WatchMovie(); // Включение всей системы для просмотра фильма
        homeTheater.EndMovie();   // Выключение всех устройств после фильма
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/4.3.php