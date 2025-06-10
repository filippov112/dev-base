#Csharp 

# xUnit Инструкция в C#

### Инструкция по использованию xUnit в C#

xUnit — это популярная библиотека для модульного тестирования в .NET. Она предоставляет простой и гибкий способ написания тестов. Ниже приведена пошаговая инструкция по использованию xUnit.

---

### 1. Установка xUnit

1. **Создайте проект для тестов**: Если у вас еще нет проекта для тестов, создайте его:
   ```bash
   dotnet new xunit -n MyProject.Tests
   cd MyProject.Tests
   ```

2. **Добавьте xUnit в проект**: Если xUnit не был добавлен автоматически, установите его через NuGet:
   ```bash
   dotnet add package xunit
   dotnet add package xunit.runner.visualstudio
   ```

3. **Добавьте ссылку на тестируемый проект**: Если вы тестируете код из другого проекта, добавьте ссылку на него:
   ```bash
   dotnet add reference ../MyProject/MyProject.csproj
   ```

---

### 2. Написание тестов

xUnit использует атрибуты для определения тестов. Основные атрибуты:
- `[Fact]` — тест, который не принимает параметры.
- `[Theory]` — параметризованный тест.
- `[InlineData]` — предоставляет данные для параметризованных тестов.

#### Пример теста с `[Fact]`:
```csharp
using Xunit;

public class CalculatorTests
{
    [Fact]
    public void Add_TwoNumbers_ReturnsSum()
    {
        // Arrange
        var calculator = new Calculator();
        int a = 5;
        int b = 3;

        // Act
        int result = calculator.Add(a, b);

        // Assert
        Assert.Equal(8, result);
    }
}
```

#### Пример параметризованного теста с `[Theory]`:
```csharp
[Theory]
[InlineData(1, 2, 3)]
[InlineData(0, 0, 0)]
[InlineData(-1, 1, 0)]
public void Add_TwoNumbers_ReturnsSum(int a, int b, int expected)
{
    // Arrange
    var calculator = new Calculator();

    // Act
    int result = calculator.Add(a, b);

    // Assert
    Assert.Equal(expected, result);
}
```

---

### 3. Запуск тестов

1. **Через командную строку**:
   Используйте команду `dotnet test` для запуска всех тестов в проекте:
   ```bash
   dotnet test
   ```

2. **В Visual Studio**:
   - Откройте Test Explorer (Тестовый обозреватель) через меню `Test` -> `Windows` -> `Test Explorer`.
   - Нажмите `Run All` (Запустить все), чтобы выполнить все тесты.

3. **Фильтрация тестов**:
   Вы можете запускать только определенные тесты, используя фильтры. Например:
   ```bash
   dotnet test --filter "FullyQualifiedName~MyNamespace.MyClass.MyTest"
   ```

---

### 4. Основные методы Assert

xUnit предоставляет множество методов для проверки условий:

- `Assert.Equal(expected, actual)` — проверяет, что два значения равны.
- `Assert.NotEqual(expected, actual)` — проверяет, что два значения не равны.
- `Assert.True(condition)` — проверяет, что условие истинно.
- `Assert.False(condition)` — проверяет, что условие ложно.
- `Assert.Null(object)` — проверяет, что объект равен `null`.
- `Assert.NotNull(object)` — проверяет, что объект не равен `null`.
- `Assert.Throws<Exception>(action)` — проверяет, что код выбрасывает исключение указанного типа.

Пример:
```csharp
[Fact]
public void Divide_ByZero_ThrowsDivideByZeroException()
{
    // Arrange
    var calculator = new Calculator();

    // Act & Assert
    Assert.Throws<DivideByZeroException>(() => calculator.Divide(10, 0));
}
```

---

### 5. Организация тестов

#### Использование `[ClassData]` и `[MemberData]`
Для более сложных сценариев можно использовать `[ClassData]` и `[MemberData]` для передачи данных в тесты.

Пример с `[MemberData]`:
```csharp
public static IEnumerable<object[]> TestData =>
    new List<object[]>
    {
        new object[] { 1, 2, 3 },
        new object[] { 0, 0, 0 },
        new object[] { -1, 1, 0 }
    };

[Theory]
[MemberData(nameof(TestData))]
public void Add_TwoNumbers_ReturnsSum(int a, int b, int expected)
{
    // Arrange
    var calculator = new Calculator();

    // Act
    int result = calculator.Add(a, b);

    // Assert
    Assert.Equal(expected, result);
}
```

#### Использование `[Trait]`
Для группировки тестов можно использовать атрибут `[Trait]`:
```csharp
[Fact]
[Trait("Category", "Math")]
public void Add_TwoNumbers_ReturnsSum()
{
    // Тест
}
```

Затем можно фильтровать тесты по категориям:
```bash
dotnet test --filter "Category=Math"
```

---

### 6. Настройка и очистка

xUnit предоставляет атрибуты для настройки и очистки перед и после тестов:

- `[Fact]` — тест выполняется независимо.
- `[Theory]` — параметризованный тест.
- `[SetUp]` и `[TearDown]` — отсутствуют в xUnit (в отличие от NUnit). Вместо этого используйте конструктор и `IDisposable`.

Пример:
```csharp
public class CalculatorTests : IDisposable
{
    private Calculator _calculator;

    public CalculatorTests()
    {
        // Настройка перед каждым тестом
        _calculator = new Calculator();
    }

    public void Dispose()
    {
        // Очистка после каждого теста
        _calculator = null;
    }

    [Fact]
    public void Add_TwoNumbers_ReturnsSum()
    {
        // Тест
    }
}
```

---

### 7. Покрытие кода тестами

Для анализа покрытия кода тестами можно использовать инструменты, такие как:
- **Coverlet**: библиотека для измерения покрытия кода.
- **ReportGenerator**: генерация отчетов о покрытии.

Пример использования Coverlet:
1. Установите Coverlet:
   ```bash
   dotnet add package coverlet.msbuild
   ```

2. Запустите тесты с измерением покрытия:
   ```bash
   dotnet test /p:CollectCoverage=true /p:CoverletOutput=./coverage/
   ```

3. Сгенерируйте отчет:
   ```bash
   dotnet tool install -g dotnet-reportgenerator-globaltool
   reportgenerator -reports:./coverage/coverage.opencover.xml -targetdir:./coverage/report
   ```

---

### Заключение

xUnit — это мощный инструмент для написания модульных тестов в .NET. Следуя этой инструкции, вы сможете создавать, организовывать и запускать тесты, а также анализировать покрытие кода.

### Outer links: