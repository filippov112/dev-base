#lang #lang-unity  

> [!note] Чтобы обращаться к **TextMeshPro** из скрипта, нужен параметр **TextMeshProUGUI**.

> [!note] TMP, вложенный в Button нельзя удалять/отключать. Перестает работать кнопка! 

Лучше отключать <font color="#ff0000">слушатель нажатия</font> с текста, потому что зачастую невидимая рамка блока текста слишком большая для UI-элемента, на котором этот TMP лежит.
Настраивается это в **Extra Settings -> Raycast Target**

- Rich Text (Extra Settings) - отвечает за восприятие html-разметки.

- [Добавление шрифтов](1.%20Languages/Unity/5.%20UI/TextMeshPro/Добавление%20шрифтов.md)
- [Ошибки TextMeshPro](1.%20Languages/Unity/5.%20UI/TextMeshPro/Ошибки%20TextMeshPro.md)
- [Подгонка текстовых блоков](1.%20Languages/Unity/5.%20UI/TextMeshPro/Подгонка%20текстовых%20блоков.md)