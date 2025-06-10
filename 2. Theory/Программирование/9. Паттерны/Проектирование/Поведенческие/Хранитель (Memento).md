
# Хранитель

**Хранитель (Memento)** — это поведенческий паттерн, который позволяет сохранять и восстанавливать состояние объекта без раскрытия его внутренней структуры. Он сохраняет моментальный снимок состояния объекта, чтобы позднее можно было вернуть его в это состояние.

📌 Когда может понадобиться:  
- Если требуется возможность отмены изменений или отката к предыдущим состояниям (например, в редакторах или играх).  
- Когда нужно сохранять состояние объекта, не раскрывая его внутреннюю логику и структуру.

📌 Суть паттерна:  
Создаётся объект `Memento`, который сохраняет внутреннее состояние объекта в момент его создания. Затем этот объект передаётся в `Caretaker`, который управляет сохранёнными состояниями и может восстанавливать их в нужный момент.

📌 Выгода:  
✔️ Позволяет откатывать изменения без раскрытия внутренней логики объекта  
✔️ Управление состоянием становится гибким и независимым от клиентского кода  
✔️ Удобно для реализации undo/redo функционала

---
#### Простой пример на C#:
В этом коде `TextEditor` сохраняет своё состояние с помощью паттерна Хранитель, и это состояние может быть восстановлено позже через объект `Memento`.

```csharp
// Хранитель состояния
class Memento
{
    public string Text { get; private set; }

    public Memento(string text)
    {
        Text = text;
    }
}

// Объект, состояние которого сохраняем
class TextEditor
{
    public string Text { get; set; }

    // Создание снимка состояния
    public Memento SaveState()
    {
        return new Memento(Text);
    }

    // Восстановление состояния
    public void RestoreState(Memento memento)
    {
        Text = memento.Text;
    }
}

// Менеджер для хранения состояний
class Caretaker
{
    private List<Memento> _mementos = new List<Memento>();
    
    public void AddMemento(Memento memento)
    {
        _mementos.Add(memento);
    }

    public Memento GetMemento(int index)
    {
        return _mementos[index];
    }
}

// Использование
class Program
{
    static void Main()
    {
        TextEditor editor = new TextEditor();
        Caretaker caretaker = new Caretaker();

        editor.Text = "Hello, world!";
        caretaker.AddMemento(editor.SaveState());

        editor.Text = "Hello, universe!";
        caretaker.AddMemento(editor.SaveState());

        editor.Text = "Goodbye, universe!";
        Console.WriteLine($"Current Text: {editor.Text}");

        // Восстановление предыдущего состояния
        editor.RestoreState(caretaker.GetMemento(1));
        Console.WriteLine($"Restored Text: {editor.Text}");

        // Восстановление исходного состояния
        editor.RestoreState(caretaker.GetMemento(0));
        Console.WriteLine($"Initial Text: {editor.Text}");
    }
}
````

### Outer links:
https://metanit.com/sharp/patterns/3.10.php