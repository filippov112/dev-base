#Csharp 
# <font color="#00b0f0">C#:</font> DynamicObject, ExpandoObject

### **<font color="#ffff00">ExpandoObject</font>**
динамический объект, расширяющий функционал на ходу.
```csharp
dynamic person = new System.Dynamic.ExpandoObject();

person.Name = "Tom";
person.Age = 46;
person.Languages = new List<string> { "english", "german", "french" };
person.IncrementAge = (Action<int>)(x => person.Age += x);
```

### **<font color="#ffff00">DynamicObject</font>**
Тот же ExpandoObject (объект с динамическим функционалом), только с расширенными возможностями.
Наследуемся от `DynamicObject` и переопределяем нужные **методы:**

```csharp
bool <название_метода>(InvokeMemberBinder binder [, object[] parms], out object value);
```
- `bool` - Возвращают результат операции.
- `InvokeMemberBinder binder` - связыватель (сведения об объекте; нас интересует - `Name`).
- `object[] parms` - параметры вызова члена (индексатора/метода).
- `out object value` - возвращаемое значение.

#### Список доступных методов

Действия операторов:
- `TryBinaryOperation()`: бинарные операторы.
- `TryUnaryOperation()`: унарные операторы.

Действия с объектом:
- `TryConvert()`: преобразование к определенному типу.
- `TryCreateInstance()`: создание экземпляра.
- `TryInvoke()`: вызов объекта как делегата.

Действия с членами объекта:
- `TrySetMember()`: устанавливает члена.
- `TryGetMember()`: получение значение члена.
- `TryInvokeMember()`: вызов делегата члена.
- `TryDeleteMember()`: удаление члена.

Действия с объектом как индексатором:
- `TrySetIndex()`: установка элемента по индексу.
- `TryGetIndex()`: получение элемента по индексу.
- `TryDeleteIndex()`: удаление элемента по индексу.

Пример:
```csharp
dynamic person = new PersonObject();

class PersonObject : DynamicObject
{
    // словарь для хранения всех свойств
    Dictionary<string, object> members = new Dictionary<string, object>();
 
    // установка члена
    public override bool TrySetMember(SetMemberBinder binder, object? value)
    {
        if(value is not null)
        {
            members[binder.Name] = value;
            return true;
        }
        return false;
    }
    
    // получение значения члена
    public override bool TryGetMember(GetMemberBinder binder, out object? result)
    {
        result = null;
        if (members.ContainsKey(binder.Name))
        {
            result = members[binder.Name];
            return true;
        }
        return false;
    }
    
    // вызов члена-делегата
    public override bool TryInvokeMember(InvokeMemberBinder binder, object?[]? args, out object? result)
    {
        result = null;
        if(args?[0] is int number)
        {
            // получаем метод по имен
            dynamic method = members[binder.Name];
            // вызываем метод, передавая его параметру значение args?[0]
            result = method(number);
        }
        // если result не равен null, то вызов метода прошел успешно
        return result != null;
    }
}
```

### Outer links:
https://metanit.com/sharp/tutorial/9.2.php