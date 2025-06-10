#lang #lang-unity 

[JSON](1.%20Languages/C-sharp/Сериализация/JSON.md)

# JsonUtility

> **JsonUtility** - основной класс.
> Объекты (классы, структура) которые нужно сериализовать требуется помечать аттрибутом *Serializable*. 

```csharp
[Serializable] 
public class MyClass 
{ 
	public int level; 
	public float timeElapsed; 
	public string playerName; 
}
```

#### Дополнительно
- [EditorJsonUtility](https://docs.unity3d.com/ScriptReference/EditorJsonUtility.html) - позволяет работать с json не только через классы и структуры.
- Вы можете исключить поля из вывода, используя `[NonSerialized]`атрибут.

#### Методы
- *FromJson*
```csharp
myObject = JsonUtility.FromJson<MyClass>(json);
```
- *FromJsonOverwrite*
```csharp
JsonUtility.FromJsonOverwrite(json, myObject);
// Используется если объект наследует MonoBehaviour или ScriptableObject.
```
- *ToJson*
```csharp
string json = JsonUtility.ToJson(myObject); // json now contains: '{"level":1,"timeElapsed":47.5,"playerName":"Dr Charles Francis"}'
```

