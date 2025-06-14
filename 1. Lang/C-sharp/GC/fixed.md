#lang #lang-c_sharp 

---
> Члены классов хранятся в куче, подвергаясь уборке сборщиком. 
> Поэтому их адреса не постоянны, что не дает использовать указатели. 

**<font color="#ffff00">`fixed`-блок</font>** - временно фиксирует адреса членов класса. 
- Зачастую используется для работы с коллекциями (в куче).
- При работе с массивами оператор `&` не требуется для привязки указателя.

---

### Примеры

```csharp
unsafe
{
    Point point = new Point();
    
    fixed (int* pX = &point.x, pY = &point.y)
    {
        *pX = 30;
        *pY = 150;
    }
}
```

```csharp
unsafe
{
    int[] nums = { 0, 1, 2, 3, 7, 88 };
    
    fixed(int* p = nums)
    {
        int third = *(p+2);     // получим третий элемент
        Console.WriteLine(third); // 2
    }

	string str = "Привет мир";
    
    fixed(char* p = str)
    {
        char forth = *(p + 3);     // получим четвертый элемент
        Console.WriteLine(forth); // в
    }
}
```