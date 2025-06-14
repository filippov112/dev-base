#lang #lang-unity

---
Источники:
https://www.youtube.com/watch?v=ZHOWqF-b51k

InputReading: https://github.com/UnityTechnologies/open-project-1/blob/main/UOP1_Project/Assets/Scripts/Input/InputReader.cs

Более новая система контроля ввода относительно старой библиотеки [Input](2.%20Frameworks/C-sharp%20-%20Unity/4.%20УПРАВЛЕНИЕ/Input.md).

#### Настройка
1. Устанавливаем пакет **Input System** и включаем его в *Project Settings -> Player -> Other -> Configuration -> Active Input Handling*
2. Создаем ассет ввода (**Input Asset**) в окне проекта.
3. Добавляем в него **Action Maps**, **Actions**, **Binding** (Раскладки, Действия, Назначения клавиш) и сохраняем ассет
4. Генерируем на основе ассета одноименный класс для работы системой ввода.
5. Добавляем scriptable object класс АПИ (**Input Reader**) для подключения обработчиков к событиям ввода.
6. Прописываем в АПИ **события** для каждого действия на которые впоследствии будем подписываться в игровых скриптах, и триггерим их в реализованных **обработчиках** интерфейсов раскладок в зависимости от нужной нам фазы события (started, performed, canceled).
7. Создаем экземпляр Input Reader в проекте и подключаем игровые действия к АПИ ввода.