#lang #lang-c_sharp

---
**IEnumerable** - позволяет создавать коллекции с возможностью перебора через `foreach`. Встроенные коллекции также его реализуют.
**IEnumerator** - определяет функционал для перебора внутренних объектов в контейнере.
> Если не требуется перебор через `foreach`,  а нужно просто обращение к элементу, то достаточно создать индексатор.

```csharp
public interface IEnumerable
{
    IEnumerator GetEnumerator();
}

public interface IEnumerator<T> // необобщенный возвращает object
{
    bool MoveNext(); // перемещение указателя на одну позицию вперед в контейнере элементов
    // Если последовательность еще не закончилась, то возвращает true. Если же последовательность закончилась, то возвращается false.
    T Current {get;}  // текущий элемент в контейнере, на котором находится указатель.
    void Reset(); // перемещение указателя в начало контейнера
}
```

```csharp
public class MyCollection : IEnumerable
{
    private List<int> data = new List<int>();

    public IEnumerator GetEnumerator()
    {
        return new MyEnumerator(data);
    }
}

public class MyEnumerator : IEnumerator
{
	private List<int> data;
	private int currentIndex = -1;

	public MyEnumerator(List<int> data)
	{
		this.data = data;
	}

	public object Current
	{
		get
		{
			return data[currentIndex];
		}
	}

	public bool MoveNext()
	{
		currentIndex++;
		return currentIndex < data.Count;
	}

	public void Reset()
	{
		currentIndex = -1;
	}
}
```

### Inner links:
[1. Интерфейсы](1.%20Lang/C-sharp/0.%20Введение/3.%20Интерфейсы/1.%20Интерфейсы.md)
[2. Индексаторы](1.%20Lang/C-sharp/0.%20Введение/2.%20Классовые%20механизмы/2.%20Индексаторы.md)

### Outer links:


