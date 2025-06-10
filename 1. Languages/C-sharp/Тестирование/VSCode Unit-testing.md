#Csharp #testing 

# VSCode Unit-testing

1. **Открываем основное решение.**
2. **Создаем проект модульного теста с именем *SomethingTest*.**
	```bash
	dotnet new mstest -o SomethingTest
	```
	Создастся проект тестирования с первым файлом тестов.
	```csharp
	namespace StringLibraryTest;
	
	[TestClass]
	public class UnitTest1
	{
		[TestMethod]
		public void TestMethod1()
		{
		}
	}
	```
3. **Добавим тестовый проект в решение.**
	```csharp
	dotnet sln add SomethingTest/SomethingTest.csproj
	```
4. **Добавим в тестовый проект ссылку на основной.**
	```bash
	dotnet add SomethingTest/SomethingTest.csproj reference Something/Something.csproj
	```

5. **Добавим тесты.**
	**Основные методы тестирования**
	
	|Методы утверждения|Функция|
	|---|---|
	|`Assert.AreEqual`|Проверяет равенство двух значений или объектов. Утверждение не выполняется, если значения или объекты не равны.|
	|`Assert.AreSame`|Проверяет, что две объектные переменные ссылаются на один и тот же объект. Утверждение не выполняется, если переменные ссылаются на разные объекты.|
	|`Assert.IsFalse`|Проверяет, что условие имеет значение `false`. Утверждение не выполняется, если условие имеет значение `true`.|
	|`Assert.IsNotNull`|Проверяет, что объект не имеет значение `null`. Утверждение не выполняется, если объект является `null`.|
	
	Пример:
	```csharp
	using Microsoft.VisualStudio.TestTools.UnitTesting;
	using UtilityLibraries;
	
	namespace StringLibraryTest;
	
	[TestClass]
	public class UnitTest1
	{
	    [TestMethod]
	    public void TestStartsWithUpper()
	    {
	        // Tests that we expect to return true.
	        string[] words = { "Alphabet", "Zebra", "ABC", "Αθήνα", "Москва" };
	        foreach (var word in words)
	        {
	            bool result = word.StartsWithUpper();
	            Assert.IsTrue(result,
	                   string.Format("Expected for '{0}': true; Actual: {1}",
	                                 word, result));
	        }
	    }
	
	    [TestMethod]
	    public void TestDoesNotStartWithUpper()
	    {
	        // Tests that we expect to return false.
	        string[] words = { "alphabet", "zebra", "abc", "αυτοκινητοβιομηχανία", "государство",
	                               "1234", ".", ";", " " };
	        foreach (var word in words)
	        {
	            bool result = word.StartsWithUpper();
	            Assert.IsFalse(result,
	                   string.Format("Expected for '{0}': false; Actual: {1}",
	                                 word, result));
	        }
	    }
	
	    [TestMethod]
	    public void DirectCallWithNullOrEmpty()
	    {
	        // Tests that we expect to return false.
	        string?[] words = { string.Empty, null };
	        foreach (var word in words)
	        {
	            bool result = StringLibrary.StartsWithUpper(word);
	            Assert.IsFalse(result,
	                   string.Format("Expected for '{0}': false; Actual: {1}",
	                                 word == null ? "<null>" : word, result));
	        }
	    }
	}
	```

6. **Запустим тесты.**
	```bash
	dotnet test StringLibraryTest/StringLibraryTest.csproj
	```
	
	C конфигурацией сборки "Выпуск".
	```bash
	dotnet test StringLibraryTest/StringLibraryTest.csproj --configuration Release
	```
	Можно также запускать через контекстное меню в дереве проекта по папке или файлу. 