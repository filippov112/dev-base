#lang #lang-c_sharp

# JSON в C#

> **JsonSerializer** - класс для работы с json. Работает как с классами, так и со структурами.
> Правила:
> - Сериализации подлежат только публичные свойства объекта (с модификатором public).
> - Объект должен иметь либо конструктор без параметров, либо конструктор, для всех параметров которого в десериализуемом json-объекте есть значения
> - Соответствие между параметрами конструктора и свойствами json-объекта устанавливается на основе названий, причем **регистр не играет значения**

1. *Serialize()*
2. *SerializeAsyc()*
3. *Deserialize()*
4. *DeserializeAsync()*

- `string Serialize(Object obj, Type type [, JsonSerializerOptions options])`
	obj типа type -> код json в виде строки. 
- `string Serialize<T>(T obj [, JsonSerializerOptions options])`
	==obj типа T -> код json в виде строки==
- `Task SerializeAsync(Stream utf8Json, Object obj, Type type [, JsonSerializerOptions options])`
	obj типа type -> поток utf8Json. 
- `Task SerializeAsync<T>(Stream utf8Json, T obj [, JsonSerializerOptions options])` 
	==obj типа T -> поток utf8Json==. 

- `object? Deserialize(string json, Type type [, JsonSerializerOptions options])`
	строка json -> объект типа type 
- `T? Deserialize<T>(string json [, JsonSerializerOptions options])`
	==строка json -> объект типа T==  
- `ValueTask<object?> DeserializeAsync(Stream utf8Json, Type type [, JsonSerializerOptions options, CancellationToken token])`
	поток utf8Json -> объект типа type
- `ValueTask<T?> DeserializeAsync<T>(Stream utf8Json [, JsonSerializerOptions options, CancellationToken token])`
	==поток utf8Json -> объект типа T==

***Options*** *позволяет задать дополнительные опции сериализации*
***Token*** *устанавливает CancellationToken для отмены задачи.*

### Пример

```csharp
using System.Text.Json;
 
Person tom = new Person("Tom", 37);
string json = JsonSerializer.Serialize(tom);
Console.WriteLine(json);
Person? restoredPerson = JsonSerializer.Deserialize<Person>(json);
Console.WriteLine(restoredPerson?.Name); // Tom
 
class Person
{
    public string Name { get;}
    public int Age { get; set; }
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
```
```
{"Name":"Tom","Age": 37}
Tom
```

**Пример с потоком:**
```csharp
using System.Text.Json;
 
// сохранение данных
using (FileStream fs = new FileStream("user.json", FileMode.OpenOrCreate))
{
    Person tom = new Person("Tom", 37);
    await JsonSerializer.SerializeAsync<Person>(fs, tom);
    Console.WriteLine("Data has been saved to file");
}
 
// чтение данных
using (FileStream fs = new FileStream("user.json", FileMode.OpenOrCreate))
{
    Person? person = await JsonSerializer.DeserializeAsync<Person>(fs);
    Console.WriteLine($"Name: {person?.Name}  Age: {person?.Age}");
}
 
class Person
{
    public string Name { get;}
    public int Age { get; set; }
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
```


#### Дополнительно

**JsonSerializerOptions**
- *AllowTrailingCommas*: устанавливает, надо ли добавлять после последнего элемента в json запятую. Если равно `true`, запятая добавляется
- *DefaultIgnoreCondition*: устанавливает, будут ли сериализоваться/десериализоваться в json свойства со значениями по умолчанию
- *IgnoreReadOnlyProperties*: аналогично устанавливает, будут ли сериализоваться свойства, предназначенные только для чтения
- *WriteIndented*: устанавливает, будут ли добавляться в json пробелы (условно говоря, для красоты). Если равно `true` устанавливаются дополнительные пробелы

```csharp
using System.Text.Json;
 
Person tom = new Person("Tom", 37);
 
var options = new JsonSerializerOptions
{
    WriteIndented = true
};
string json = JsonSerializer.Serialize<Person>(tom, options);
Console.WriteLine(json);
Person? restoredPerson = JsonSerializer.Deserialize<Person>(json);
Console.WriteLine(restoredPerson?.Name);
```
```
{
	"Name": "Tom",
	"Age":  37
}
Tom
```

**Аттрибуты сериализации**
- *JsonIgnore* позволяет исключить из сериализации определенное свойство.
- *JsonPropertyName* позволяет замещать оригинальное название свойства.

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;
 
Person tom = new Person("Tom", 37);
 
string json = JsonSerializer.Serialize<Person>(tom);
Console.WriteLine(json);
Person? person = JsonSerializer.Deserialize<Person>(json);
Console.WriteLine($"Name: {person?.Name}  Age: {person?.Age}");
 
class Person
{
    [JsonPropertyName("firstname")]
    public string Name { get;}
    [JsonIgnore]
    public int Age { get; set; }
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
```
```
{"firstname":"Tom"}
Name: Tom   Age: 0
```


### Внутренние ссылки
[3. Модификаторы доступа](1.%20Languages/C-sharp/0.%20Введение/1.%20Области%20видимости/3.%20Модификаторы%20доступа.md)
[JsonUtility](1.%20Languages/Unity/_БИБЛИОТЕКИ/JsonUtility.md)

### Внешние ссылки
