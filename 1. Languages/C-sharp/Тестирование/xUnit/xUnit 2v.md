### Инструкция по использованию xUnit для написания и запуска тестов в C#

xUnit — это популярная библиотека для модульного тестирования в .NET. Она проста в использовании и предоставляет мощные возможности для написания тестов. Ниже приведена пошаговая инструкция по использованию xUnit.

---

### 1. Установка xUnit

1. **Создайте новый проект** (если у вас его еще нет):
   - Для библиотеки классов:
     ```bash
     dotnet new classlib -n MyLibrary
     cd MyLibrary
     ```
   - Для консольного приложения:
     ```bash
     dotnet new console -n MyApp
     cd MyApp
     ```

2. **Добавьте xUnit в проект**:
   - Установите пакет xUnit:
     ```bash
     dotnet add package xunit
     ```
   - Установите пакет для интеграции с Visual Studio (если используете IDE):
     ```bash
     dotnet add package xunit.runner.visualstudio
     ```

3. **Создайте проект для тестов**:
   - Создайте новый проект xUnit:
     ```bash
     dotnet new xunit -n MyLibrary.Tests
     cd MyLibrary.Tests
     ```
   - Добавьте ссылку на основной проект (если тестируете другую библиотеку):
     ```bash
     dotnet add reference ../MyLibrary/MyLibrary.csproj
     ```

---

### 2. Написание тестов

xUnit использует атрибуты для определения тестов. Основные атрибуты:

- `[Fact]` — тест, который не принимает параметры.
- `[Theory]` — параметризованный тест.
- `[InlineData]` — предоставляет данные для параметризованных тестов.

#### Пример тестов

1. **Создайте класс для тестирования** (например, `Calculator`):
   ```csharp
   namespace MyLibrary
   {
       public class Calculator
       {
           public int Add(int a, int b) => a + b;
           public int Subtract(int a, int b) => a - b;
           public int Multiply(int a, int b) => a * b;
           public int Divide(int a, int b) => b == 0 ? throw new DivideByZeroException() : a / b;
       }
   }
   ```

2. **Напишите тесты** в проекте `MyLibrary.Tests`:
   ```csharp
   using Xunit;
   using MyLibrary;

   namespace MyLibrary.Tests
   {
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

           [Theory]
           [InlineData(10, 2, 5)]
           [InlineData(20, 4, 5)]
           [InlineData(15, 3, 5)]
           public void Divide_TwoNumbers_ReturnsQuotient(int a, int b, int expected)
           {
               // Arrange
               var calculator = new Calculator();

               // Act
               int result = calculator.Divide(a, b);

               // Assert
               Assert.Equal(expected, result);
           }

           [Fact]
           public void Divide_ByZero_ThrowsDivideByZeroException()
           {
               // Arrange
               var calculator = new Calculator();
               int a = 10;
               int b = 0;

               // Act & Assert
               Assert.Throws<DivideByZeroException>(() => calculator.Divide(a, b));
           }
       }
   }
   ```

---

### 3. Запуск тестов

1. **Запустите тесты через командную строку**:
   ```bash
   dotnet test
   ```

2. **Запуск тестов в Visual Studio**:
   - Откройте Test Explorer (Меню → Тест → Обозреватель тестов).
   - Нажмите "Запустить все" или выберите конкретные тесты для запуска.

---

### 4. Основные концепции xUnit

#### Атрибуты
- `[Fact]` — тест без параметров.
- `[Theory]` — параметризованный тест.
- `[InlineData]` — предоставляет данные для `[Theory]`.
- `[MemberData]` — позволяет использовать метод или свойство для предоставления данных.
- `[ClassData]` — позволяет использовать класс для предоставления данных.

#### Assert (Проверки)
- `Assert.Equal(expected, actual)` — проверяет равенство.
- `Assert.True(condition)` — проверяет, что условие истинно.
- `Assert.False(condition)` — проверяет, что условие ложно.
- `Assert.Throws<Exception>(action)` — проверяет, что метод выбрасывает исключение.

#### Жизненный цикл тестов
- **Конструктор** — вызывается перед каждым тестом.
- **Dispose** — вызывается после каждого теста (если класс реализует `IDisposable`).
- `[Fact]` и `[Theory]` — независимые тесты, которые выполняются изолированно.

---

### 5. Пример параметризованного теста с `[MemberData]`

```csharp
public class CalculatorTests
{
    public static IEnumerable<object[]> TestData =>
        new List<object[]>
        {
            new object[] { 1, 2, 3 },
            new object[] { -1, -2, -3 },
            new object[] { 0, 0, 0 }
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
}
```

---

### 6. Советы по использованию xUnit

1. **Именование тестов**:
   - Используйте понятные имена, например, `MethodName_Scenario_ExpectedBehavior`.
   - Пример: `Add_TwoPositiveNumbers_ReturnsSum`.

2. **Изоляция тестов**:
   - Каждый тест должен быть независимым.
   - Избегайте использования общих данных между тестами.

3. **Использование `[Theory]`**:
   - Параметризованные тесты помогают избежать дублирования кода.

4. **Обработка исключений**:
   - Используйте `Assert.Throws` для проверки исключений.

---

### 7. Дополнительные ресурсы

- [Официальная документация xUnit](https://xunit.net/)
- [Руководство по xUnit на Microsoft Docs](https://learn.microsoft.com/ru-ru/dotnet/core/testing/unit-testing-with-dotnet-test)

Теперь вы готовы использовать xUnit для написания и запуска тестов в своих проектах! 🚀