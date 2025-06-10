#lang #lang-python 

# Command

```sql
PRAGMA foreign_keys = ON;
drop table IF EXISTS [stack.OrderItems];
drop table IF EXISTS [stack.Orders];
drop table IF EXISTS [stack.Customers];
CREATE TABLE IF NOT EXISTS [stack.Customers](row_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS [stack.Orders](   row_id INTEGER PRIMARY KEY AUTOINCREMENT,   parent_id INTEGER,   group_name TEXT,    customer_id INTEGER,    registered_at TEXT,    constraint FK_Orders_Folder       foreign key (parent_id)       references [stack.Orders](row_id)      on delete no action      on update no action,   constraint FK_Customers      foreign key (customer_id)      references [stack.Customers](row_id)      on delete cascade   on update cascade  );
CREATE TABLE IF NOT EXISTS [stack.OrderItems](   row_id INTEGER PRIMARY KEY AUTOINCREMENT,   order_id INTEGER NOT NULL,    name TEXT NOT NULL,    price INTEGER NOT NULL,    constraint FK_OrderItems_Orders      foreign key (order_id)       references [stack.Orders](row_id)     on delete cascade  on update cascade );
insert into [stack.Customers](name) values('Иванов');
insert into [stack.Customers](name) values('Петров');
insert into [stack.Customers](name) values('Сидоров');
insert into [stack.Customers](name) values('ИП Федоров');
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (null, 'Все заказы', null, null);
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (1, 'Частные лица', null, null);
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (2, 'Оргтехника', null, null);
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (3, null, 1, '2019/10/02');
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (3, null, 1, '2020/05/17');
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (3, null, 1, '2020/04/28');
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (3, null, 2, '2019/08/05');
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (3, null, 2, '2020/05/17');
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (3, null, 2, '2020/02/11');
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (2, 'Канцелярия', null, null);
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (10, null, 3, '2020/04/09');
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (1, 'Юридические лица', null, null);
insert into [stack.Orders](parent_id, group_name, customer_id, registered_at) values (12, null, 4, '2020/06/25');
insert into [stack.OrderItems](order_id, name, price) values (4, 'Принтер', 30);
insert into [stack.OrderItems](order_id, name, price) values (4, 'Факс', 20);
insert into [stack.OrderItems](order_id, name, price) values (5, 'Принтер', 50);
insert into [stack.OrderItems](order_id, name, price) values (5, 'Кассовый аппарат', 40);
insert into [stack.OrderItems](order_id, name, price) values (5, 'Факс', 30);
insert into [stack.OrderItems](order_id, name, price) values (6, 'Кассовый аппарат', 30);
insert into [stack.OrderItems](order_id, name, price) values (6, 'Кассовый аппарат', 40);
insert into [stack.OrderItems](order_id, name, price) values (7, 'Копировальный аппарат', 50);
insert into [stack.OrderItems](order_id, name, price) values (7, 'Калькулятор', 10);
insert into [stack.OrderItems](order_id, name, price) values (7, 'Кассовый аппарат', 60);
insert into [stack.OrderItems](order_id, name, price) values (8, 'Принтер', 50);
insert into [stack.OrderItems](order_id, name, price) values (8, 'Калькулятор', 10);
insert into [stack.OrderItems](order_id, name, price) values (9, 'Телефонный аппарат', 50);
insert into [stack.OrderItems](order_id, name, price) values (9, 'Кассовый аппарат', 40);
insert into [stack.OrderItems](order_id, name, price) values (11, 'Бумага', 2);
insert into [stack.OrderItems](order_id, name, price) values (11, 'Ручки', 1);
insert into [stack.OrderItems](order_id, name, price) values (13, 'Кулер', 100);
insert into [stack.OrderItems](order_id, name, price) values (13, 'Стулья', 70);
insert into [stack.OrderItems](order_id, name, price) values (13, 'Факс', 20);
```
