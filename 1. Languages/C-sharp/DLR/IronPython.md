#Csharp 
# <font color="#00b0f0">C#:</font> IronPython

Позволяет взаимодействовать с python-скриптами.

1. Устанавливаем пакеты: `DynamicLanguageRuntime`, `IronPython`.
2. Подключаем пространства имен
	```csharp
	using IronPython.Hosting;
	using Microsoft.Scripting.Hosting;
	```
3. Подключаем движок
	```csharp
	ScriptEngine engine = Python.CreateEngine();
	```
4. Пользуемся:
	- **Строчный скрипт**
		```csharp
		engine.Execute("print('hello, world')");
		```
	- **Файловый скрипт**	
		```csharp
		engine.ExecuteFile("hello.py");
		```
	- **Установка/получение переменных**
		```csharp
		ScriptScope scope = engine.CreateScope();
		// Установка
		scope.SetVariable("y", 22);
		// Запуск
		engine.ExecuteFile("hello.py", scope);
		// Возврат
		dynamic x = scope.GetVariable("x");
		```
	- **Вызов функции**
		```csharp
		ScriptScope scope = engine.CreateScope();
		engine.ExecuteFile("hello.py", scope);
		
		dynamic square = scope.GetVariable("square");
		dynamic result = square(5);
		```

### Outer links:
https://metanit.com/sharp/tutorial/9.3.php