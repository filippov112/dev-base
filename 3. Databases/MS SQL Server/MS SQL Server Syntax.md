#db #db-mssql
 
---
### <font color="#ffff00">DDL (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`, и `RENAME`)</font>
##### Таблицы
```sql
/* создать таблицу */
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    HireDate DATE
);

/* удалить таблицу */
DROP TABLE Employees;

/* очистить таблицу */
TRUNCATE TABLE Employees;

/* переименовать таблицу */
EXEC sp_rename 'Employees', 'Staff';
```
##### Столбцы
```sql
/* создать столбец */
ALTER TABLE Employees
ADD Email NVARCHAR(100);

/* изменить столбец */
ALTER TABLE Employees
ALTER COLUMN FirstName NVARCHAR(100);

/* удалить столбец */
ALTER TABLE Employees
DROP COLUMN Email;
```
##### Индексы
```sql
/* создать индекс */
CREATE INDEX idx_lastname ON Employees(LastName);

/* удалить индекс */
DROP INDEX idx_lastname ON Employees;
```
##### Внешние ключи
```sql
/* добавить внешний ключ */
ALTER TABLE Orders
ADD CONSTRAINT FK_EmployeeOrder
FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID);
```
---
### <font color="#ffff00">DML (`INSERT`, `UPDATE`, `DELETE`)</font>
##### Вставки
```sql
/* Вставка одной записи */
INSERT INTO Employees (FirstName, LastName, HireDate, Salary)
VALUES ('John', 'Doe', '2023-09-15', 60000);

/* Вставка нескольких записей */
INSERT INTO Employees (FirstName, LastName, HireDate, Salary)
VALUES ('Alice', 'Smith', '2023-07-10', 75000),
        ('Bob', 'Brown', '2023-08-20', 72000);
```
##### Изменения
```sql
/* Обновление записей с условием */
UPDATE Employees
SET Salary = Salary + 5000
WHERE HireDate < '2022-01-01';

/* Обновление всех записей */
UPDATE Employees
SET HireDate = '2023-01-01';
```
##### Удаления
```sql
/* Удаление записей с условием */
DELETE FROM Employees
WHERE HireDate < '2019-01-01';

/* Удаление всех записей */
DELETE FROM Employees;
```
##### Объединения
```sql
/* объединения данных T-SQL (SQL Server)*/
MERGE INTO Employees AS Target
USING NewEmployees AS Source
ON Target.EmployeeID = Source.EmployeeID
WHEN MATCHED THEN
    UPDATE SET Target.FirstName = Source.FirstName, Target.LastName = Source.LastName
WHEN NOT MATCHED BY TARGET THEN
    INSERT (FirstName, LastName, HireDate, Salary)
    VALUES (Source.FirstName, Source.LastName, Source.HireDate, Source.Salary)
WHEN NOT MATCHED BY SOURCE THEN
    DELETE;
```
---
### <font color="#ffff00">DRL (`SELECT` и её расширенные формы)</font>

##### SELECT
```sql
/* Извлекает все столбцы и строки из таблицы `Employees`. */
SELECT * FROM Employees;

/* Извлекает только указанные столбцы из таблицы. */
SELECT FirstName, LastName FROM Employees;

/* Извлекает только те записи, где дата приема на работу больше 1 января 2020 года. */
SELECT * FROM Employees
WHERE HireDate > '2020-01-01';
```
##### ORDER BY
```sql
/* Сортирует результаты по фамилии в порядке возрастания. */
SELECT * FROM Employees
ORDER BY LastName ASC;
```
##### LIMIT, TOP
```sql
/* Ограничивает количество возвращаемых строк до 10. T-SQL (SQL Server) */
SELECT TOP 10 * FROM Employees;
```
##### GROUP BY
```sql
/* Возвращает количество сотрудников в каждом департаменте. */
SELECT DepartmentID, COUNT(*) AS EmployeeCount
FROM Employees
GROUP BY DepartmentID;
```
##### HAVING
```sql
/* Фильтрует группы, оставляя только те департаменты, где более 5 сотрудников. */
SELECT DepartmentID, COUNT(*) AS EmployeeCount
FROM Employees
GROUP BY DepartmentID
HAVING COUNT(*) > 5;
```
##### JOIN
```sql
/* Извлекает данные из таблиц `Employees` и `Departments`, объединяя их по полю `DepartmentID`. */
SELECT Employees.FirstName, Employees.LastName, Departments.DepartmentName
FROM Employees
INNER JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;

/* Извлекает всех сотрудников, даже если у них нет департамента, возвращая `NULL` для отсутствующих значений в таблице `Departments`. */
SELECT Employees.FirstName, Employees.LastName, Departments.DepartmentName
FROM Employees
LEFT JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;
```
##### Подзапросы
```sql
/* Извлекает сотрудников, которые работают в отделе "HR". */
SELECT FirstName, LastName
FROM Employees
WHERE DepartmentID = (SELECT DepartmentID FROM Departments WHERE DepartmentName = 'HR');
```
##### UNION
```sql
/* Объединяет результаты двух запросов, удаляя дубликаты. */
SELECT FirstName, LastName FROM Employees
WHERE DepartmentID = 1
UNION
SELECT FirstName, LastName FROM Employees
WHERE DepartmentID = 2;
```
##### DISTINCT
```sql
/* Извлекает уникальные значения поля `DepartmentID`. */
SELECT DISTINCT DepartmentID FROM Employees;
```
##### CASE
```sql
/* Возвращает текстовое значение в зависимости от условий по зарплате. */
SELECT FirstName, LastName,
CASE
    WHEN Salary > 50000 THEN 'High Salary'
    ELSE 'Low Salary'
END AS SalaryCategory
FROM Employees;
```
---
### <font color="#ffff00">TCL (`BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`, и `SAVEPOINT`)</font>
##### BEGIN TRANSACTION
Запускает транзакцию, в пределах которой несколько команд могут быть выполнены как одна логическая операция.
```sql
BEGIN TRANSACTION;
```
##### COMMIT
Подтверждает (сохраняет) все изменения, сделанные в рамках текущей транзакции, и завершает её.
```sql
COMMIT;
```
##### ROLLBACK
Отменяет все изменения, сделанные с начала текущей транзакции, и возвращает базу данных в состояние до начала транзакции.
```sql
ROLLBACK;
```
##### SAVEPOINT
Создаёт точку внутри транзакции, к которой можно вернуться с помощью команды `ROLLBACK TO SAVEPOINT`. Это позволяет частично откатывать изменения.
```sql
SAVEPOINT savepoint_name;
```
##### ROLLBACK TO SAVEPOINT
Отменяет изменения только до указанной точки сохранения, не отменяя всю транзакцию, но не завершает транзакцию.
```sql
ROLLBACK TO SAVEPOINT savepoint_name;
```
##### RELEASE SAVEPOINT
Удаляет точку сохранения, при этом все изменения до неё остаются в транзакции.
```sql
RELEASE SAVEPOINT savepoint_name;
```

---
### <font color="#ffff00">Встроенные функции</font>
#### **Агрегатные функции**
##### `COUNT()`
Подсчитывает количество строк в наборе данных.
```sql
SELECT COUNT(*) FROM Employees;
```
##### `SUM()`
Возвращает сумму значений числового столбца.
```sql
SELECT SUM(Salary) FROM Employees;
```
##### `AVG()`
Возвращает среднее значение числового столбца.
```sql
SELECT AVG(Salary) FROM Employees;
```
##### `MAX()`
Возвращает максимальное значение столбца.
```sql
SELECT MAX(Salary) FROM Employees;
```
##### `MIN()`
Возвращает минимальное значение столбца.
```sql
SELECT MIN(Salary) FROM Employees;
```

#### **Функции для работы с текстом**
##### `LENGTH()`, `LEN()`
Возвращает количество символов в строке.
```sql
SELECT LEN(FirstName) FROM Employees;
```
##### `LOWER()`
Возвращает строку, преобразованную в нижний регистр.
```sql
SELECT LOWER(FirstName) FROM Employees;
```
##### `UPPER()`
Возвращает строку, преобразованную в верхний регистр.
```sql
SELECT UPPER(FirstName) FROM Employees;
```
##### `SUBSTRING()`, `SUBSTR()`
Извлекает часть строки, начиная с определённого символа.
```sql
SELECT SUBSTRING(FirstName, 1, 3) FROM Employees;
```
##### `TRIM()`
Удаляет пробелы (или другие символы) в начале и конце строки.
```sql
SELECT TRIM(FirstName) FROM Employees;
```
##### `CONCAT()`
Объединяет несколько строк в одну.
```sql
SELECT FirstName + ' ' + LastName AS FullName FROM Employees;
```

#### **Функции для работы с числами**

##### `ROUND()`
Округляет число до заданного количества десятичных знаков.
```sql
SELECT ROUND(Salary, 2) FROM Employees;
```
##### `CEILING()`
Возвращает наименьшее целое число, большее или равное данному.
```sql
SELECT CEILING(Salary) FROM Employees;
```
##### `FLOOR()`
Возвращает наибольшее целое число, меньшее или равное данному.
```sql
SELECT FLOOR(Salary) FROM Employees;
```
##### `ABS()`
Возвращает абсолютное значение (модуль) числа.
```sql
SELECT ABS(Salary) FROM Employees;
```

#### **Функции для работы с датами и временем**

##### `GETDATE()`, `CURRENT_TIMESTAMP`, `NOW()`
Возвращает текущую дату и время.
```sql
SELECT GETDATE();
```
##### `DATEADD()`
Добавляет указанный интервал к дате.
```sql
SELECT DATEADD(DAY, 10, HireDate) FROM Employees;
```
##### `DATEDIFF()`
Возвращает разницу между двумя датами в указанном интервале.
```sql
SELECT DATEDIFF(DAY, HireDate, GETDATE()) FROM Employees;
```
##### `EXTRACT()`
Извлекает отдельные компоненты даты, такие как год, месяц, день и т.д.
```sql
SELECT EXTRACT(YEAR FROM HireDate) FROM Employees;
```
```sql
SELECT YEAR(HireDate) FROM Employees;
```

#### **Прочие полезные функции**
##### `COALESCE()` 
Возвращает первое ненулевое значение из списка аргументов.
```sql
SELECT COALESCE(MiddleName, 'N/A') FROM Employees;
```
##### `NULLIF()`
Возвращает `NULL`, если два выражения равны; в противном случае возвращает первое выражение.
```sql
SELECT NULLIF(Salary, 0) FROM Employees;
```
##### `CAST()`
Приводит выражение к заданному типу данных.
```sql
SELECT CAST(Salary AS VARCHAR(10)) FROM Employees;
```
##### `ISNULL()`, `IFNULL()`, `COALESCE()`
Заменяет `NULL` на указанное значение.
```sql
SELECT ISNULL(Salary, 0) FROM Employees;
```
---
### <font color="#ffff00">Представления</font>
##### CREATE VIEW
```sql
CREATE VIEW EmployeeView AS
SELECT FirstName, LastName, Salary
FROM Employees
WHERE Salary > 50000;
```
##### ALTER VIEW
```sql
ALTER VIEW EmployeeView AS
SELECT FirstName, LastName, Salary, HireDate
FROM Employees
WHERE Salary > 60000;
```
##### DROP VIEW
```sql
DROP VIEW EmployeeView;
```

---
### <font color="#ffff00">Триггеры</font>
##### CREATE TRIGGER
```sql
CREATE TRIGGER trigger_name
AFTER|BEFORE INSERT|UPDATE|DELETE
ON table_name
FOR EACH ROW
BEGIN
    -- действия триггера
END;
```

```sql
/* Этот триггер срабатывает после обновления зарплаты сотрудников. Если зарплата изменилась, данные о старой и новой зарплате записываются в таблицу `SalaryChanges`. */
CREATE TRIGGER trg_AfterUpdateSalary
ON Employees
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Salary)
    BEGIN
        INSERT INTO SalaryChanges(EmployeeID, OldSalary, NewSalary, ChangeDate)
        SELECT i.EmployeeID, d.Salary, i.Salary, GETDATE()
        FROM inserted i
        JOIN deleted d ON i.EmployeeID = d.EmployeeID;
    END;
END;
```
##### DROP TRIGGER
```sql
DROP TRIGGER trg_AfterUpdateSalary;
```
##### Просмотр информации о триггерах
```sql
SELECT name, is_instead_of_trigger, is_disabled
FROM sys.triggers
WHERE parent_id = OBJECT_ID('Employees');
```
##### Еще примеры
```sql
/* Эти триггеры срабатывают перед вставкой нового сотрудника и проверяют, что зарплата не является отрицательной. Если она меньше нуля, выполняется ошибка, и операция прерывается. */
CREATE TRIGGER trg_BeforeInsertEmployee
ON Employees
INSTEAD OF INSERT
AS
BEGIN
    IF EXISTS (SELECT * FROM inserted WHERE Salary < 0)
    BEGIN
        RAISERROR ('Salary cannot be negative', 16, 1);
        ROLLBACK TRANSACTION;
    END;
    ELSE
    BEGIN
        INSERT INTO Employees (FirstName, LastName, Salary)
        SELECT FirstName, LastName, Salary FROM inserted;
    END;
END;
```

```sql
/* Триггер срабатывает после удаления записи о сотруднике и удаляет все записи о его проектах из таблицы `Projects`. */
CREATE TRIGGER trg_AfterDeleteEmployee
ON Employees
AFTER DELETE
AS
BEGIN
    DELETE FROM Projects WHERE EmployeeID IN (SELECT EmployeeID FROM deleted);
END;
```

```sql
/* Этот триггер заменяет операцию удаления сотрудников на выполнение пользовательских действий, не удаляя данные. */
CREATE TRIGGER trg_InsteadOfDeleteEmployee
ON Employees
INSTEAD OF DELETE
AS
BEGIN
    PRINT 'Instead of deleting the employee, a custom action is performed.';
END;
```
