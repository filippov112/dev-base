#lang #lang-unity  

# PlayerPrefs

Встроенная в Unity система сохранения данных.

Синтаксис:
```csharp
PlayerPrefs.SetInt("Position", 1);
PlayerPrefs.GetInt("Position");

PlayerPrefs.SetFloat(...);
PlayerPrefs.GetFloat(...);

PlayerPrefs.SetBool(...);
PlayerPrefs.GetBool(...);

PlayerPrefs.DeleteAll();

PlayerPrefs.HasKey("Position");
```