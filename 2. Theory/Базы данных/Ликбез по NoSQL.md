 #theory #theory-database

---
### Плюсы и минусы
<font color="#00b050">- Гибкость схемы</font>
<font color="#00b050">- Горизонтальное масштабирование</font>
<font color="#00b050">- Высокая производительность</font>

<font color="#ff0000">- Отсутствие стандартизации</font>
<font color="#ff0000">- Ограниченная функциональность запросов</font>
<font color="#ff0000">- Потенциальные проблемы с консистентностью данных</font>

---

### Горизонтальное масштабирование
Распределение данных и нагрузки между несколькими серверами для повышения производительности и отказоустойчивости. 
- В SQL базах данных горизонтальное масштабирование может быть сложным из-за необходимости поддержания согласованности данных и сложных связей между таблицами. 
- В NoSQL базах данных горизонтальное масштабирование реализуется проще (доступно из коробки) благодаря их архитектуре, позволяющей легко распределять данные между узлами.

### Репликация данных
Процесс копирования и синхронизации данных между несколькими серверами для обеспечения высокой доступности и отказоустойчивости. 
- В SQL базах данных репликация часто реализуется с использованием механизмов журнала транзакций и может быть настроена в различных режимах (синхронная, асинхронная). 
- В NoSQL базах данных подходы к репликации могут значительно различаться в зависимости от конкретной системы, но часто они ориентированы на обеспечение высокой доступности и масштабируемости, иногда в ущерб строгой консистентности данных.

### Консистентность данных
Все узлы системы видят одни и те же данные в одно и то же время. 
- В SQL консистентность достигается за счет строгого соблюдения *свойств ACID*.
	- **SQL - Свойства ACID** (Atomicity, Consistency, Isolation, Durability) - обеспечивают надежность и предсказуемость транзакций. 
- В NoSQL базах данных часто применяется *модель BASE*. 
	- **NoSQL - BASE принципы** (Basically Available, Soft state, Eventual consistency) - допускает временную неконсистентность данных в обмен на высокую доступность и масштабируемость.
	- **eventual consistency** — состояние, при котором система со временем достигает консистентности.

### Outer links:
- [astera.com](https://www.astera.com/ru/knowledge-center/sql-vs-nosql/?utm_source=chatgpt.com)
- [struchkov.dev](https://struchkov.dev/blog/ru/database-replication/?utm_source=chatgpt.com)
- [aws.amazon.com](https://aws.amazon.com/compare/the-difference-between-acid-and-base-database/?utm_source=chatgpt.com)
- [azure.microsoft.com](https://azure.microsoft.com/ru-ru/resources/cloud-computing-dictionary/scaling-out-vs-scaling-up?utm_source=chatgpt.com)
- [tproger.ru](https://tproger.ru/translations/types-of-nosql-db?utm_source=chatgpt.com)
- [habr.com](https://habr.com/ru/companies/ruvds/articles/727474/?utm_source=chatgpt.com)
- [yandex.cloud](https://yandex.cloud/ru/blog/posts/2022/10/nosql?utm_source=chatgpt.com)
- [proselyte.net](https://proselyte.net/tutorials/system-design/sql-vs-nosql/?utm_source=chatgpt.com)
- [sky.pro](https://sky.pro/wiki/sql/sql-i-nosql-bazy-dannyh-chto-vybrat/?utm_source=chatgpt.com)
- [habr.com](https://habr.com/ru/sandbox/113232/?utm_source=chatgpt.com)
- [aws.amazon.com](https://aws.amazon.com/compare/the-difference-between-acid-and-base-database/?utm_source=chatgpt.com)