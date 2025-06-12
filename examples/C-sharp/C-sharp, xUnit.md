#example #lang-c_sharp 

___
### Шаг 1: Создание проекта

1. Создайте новый проект класса в Visual Studio или через командную строку:
   ```bash
   dotnet new classlib -n MyMathLibrary
   cd MyMathLibrary
   ```

2. Добавьте новый класс `Calculator` в проект:
   ```csharp
   namespace MyMathLibrary
   {
       public class Calculator
       {
           public int Add(int a, int b)
           {
               return a + b;
           }

           public int Subtract(int a, int b)
           {
               return a - b;
           }

           public int Multiply(int a, int b)
           {
               return a * b;
           }

           public int Divide(int a, int b)
           {
               if (b == 0)
               {
                   throw new DivideByZeroException("Cannot divide by zero.");
               }
               return a / b;
           }
       }
   }
   ```

### Шаг 2: Добавление xUnit в проект

1. Добавьте xUnit в проект:
   ```bash
   dotnet add package xunit
   dotnet add package xunit.runner.visualstudio
   ```

2. Создайте новый проект для тестов:
   ```bash
   dotnet new xunit -n MyMathLibrary.Tests
   cd MyMathLibrary.Tests
   dotnet add reference ../MyMathLibrary/MyMathLibrary.csproj
   ```

### Шаг 3: Написание тестов

1. В проекте `MyMathLibrary.Tests` создайте класс `CalculatorTests`:
   ```csharp
   using Xunit;
   using MyMathLibrary;

   namespace MyMathLibrary.Tests
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

           [Fact]
           public void Subtract_TwoNumbers_ReturnsDifference()
           {
               // Arrange
               var calculator = new Calculator();
               int a = 10;
               int b = 4;

               // Act
               int result = calculator.Subtract(a, b);

               // Assert
               Assert.Equal(6, result);
           }

           [Fact]
           public void Multiply_TwoNumbers_ReturnsProduct()
           {
               // Arrange
               var calculator = new Calculator();
               int a = 7;
               int b = 2;

               // Act
               int result = calculator.Multiply(a, b);

               // Assert
               Assert.Equal(14, result);
           }

           [Fact]
           public void Divide_TwoNumbers_ReturnsQuotient()
           {
               // Arrange
               var calculator = new Calculator();
               int a = 20;
               int b = 5;

               // Act
               int result = calculator.Divide(a, b);

               // Assert
               Assert.Equal(4, result);
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

### Шаг 4: Запуск тестов

1. Запустите тесты через командную строку:
   ```bash
   dotnet test
   ```

2. Если все тесты написаны правильно, вы увидите сообщение о том, что все тесты прошли успешно.

### Заключение

Теперь у вас есть простое C# приложение с библиотекой xUnit для модульного тестирования. Вы можете расширять этот пример, добавляя новые методы и тесты, чтобы лучше понять, как работает xUnit и как писать эффективные модульные тесты.