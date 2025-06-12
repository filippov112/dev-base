#lang #lang-unity

---
https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.html

##### **Properties**
|   |   |
|---|---|
|[gameObject](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component-gameObject.html)|Игровой объект, к которому прикреплен этот компонент. Компонент всегда привязан к игровому объекту.|
|[tag](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component-tag.html)|Тег этого игрового объекта.|
|[transform](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component-transform.html)|Transform, прикрепленный к этому GameObject.|

##### **Public Methods**
|   |   |
|---|---|
|[BroadcastMessage](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.BroadcastMessage.html)|Вызывает метод с именем MethodName для каждого MonoBehaviour в этом игровом объекте или любом из его дочерних элементов.|
|[CompareTag](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.CompareTag.html)|Сверяет тег GameObject по определенному тегу.|
|[GetComponent](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.GetComponent.html)|Получает ссылку на компонент типа T на том же GameObject, что и указанный компонент.|
|[GetComponentInChildren](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.GetComponentInChildren.html)|Получает ссылку на компонент типа T на том же GameObject, что и указанный компонент, или на любой дочерний элемент GameObject.|
|[GetComponentIndex](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.GetComponentIndex.html)|Получает индекс компонента его родительского GameObject.|
|[GetComponentInParent](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.GetComponentInParent.html)|Получает ссылку на компонент типа T на том же GameObject, что и указанный компонент, или на любого родительского объекта GameObject.|
|[GetComponents](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.GetComponents.html)|Получает ссылки на все компоненты типа T в том же GameObject, что и указанный компонент.|
|[GetComponentsInChildren](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.GetComponentsInChildren.html)|Получает ссылки на все компоненты типа T на том же GameObject, что и указанный компонент, и на любого дочернего элемента GameObject.|
|[GetComponentsInParent](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.GetComponentsInParent.html)|Получает ссылки на все компоненты типа T на том же GameObject, что и указанный компонент, и на любого родительского объекта GameObject.|
|[SendMessage](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.SendMessage.html)|Вызывает метод с именем MethodName для каждого MonoBehaviour в этом игровом объекте.|
|[SendMessageUpwards](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.SendMessageUpwards.html)|Вызывает метод с именем MethodName для каждого MonoBehaviour в этом игровом объекте и для каждого предка поведения.|
|[TryGetComponent](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Component.TryGetComponent.html)|Получает компонент указанного типа, если он существует.|

### **Inherited Members**
##### **Properties**
|   |   |
|---|---|
|[hideFlags](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object-hideFlags.html)|Должен ли объект быть скрыт, сохранен вместе со сценой или может быть изменен пользователем?|
|[name](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object-name.html)|Имя объекта.|

##### **Public Methods**
|   |   |
|---|---|
|[GetInstanceID](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.GetInstanceID.html)|Получает идентификатор экземпляра объекта.|
|[ToString](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.ToString.html)|Возвращает имя объекта.|

##### **Static Methods**
|   |   |
|---|---|
|[Destroy](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.Destroy.html)|Удаляет GameObject, компонент или актив.|
|[DestroyImmediate](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.DestroyImmediate.html)|Немедленно уничтожает объект obj. Вместо этого настоятельно рекомендуется использовать Destroy.|
|[DontDestroyOnLoad](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.DontDestroyOnLoad.html)|Не уничтожайте целевой объект при загрузке новой сцены.|
|[FindAnyObjectByType](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.FindAnyObjectByType.html)|Извлекает любой активный загруженный объект типа Type.|
|[FindFirstObjectByType](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.FindFirstObjectByType.html)|Извлекает первый активный загруженный объект типа Type.|
|[FindObjectOfType](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.FindObjectOfType.html)|Возвращает первый активный загруженный объект типа Type.|
|[FindObjectsByType](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.FindObjectsByType.html)|Получает список всех загруженных объектов типа Тип.|
|[FindObjectsOfType](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.FindObjectsOfType.html)|Получает список всех загруженных объектов типа Тип.|
|[Instantiate](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.Instantiate.html)|Клонирует оригинал объекта и возвращает клон.|
|[InstantiateAsync](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.InstantiateAsync.html)|Делает снимок исходного объекта (который должен быть связан с каким-либо GameObject) и возвращает AsyncInstantiateOperation.|

##### **Operators**
|   |   |
|---|---|
|[bool](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object-operator_Object.html)|Объект существует?|
|[operator !=](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object-operator_ne.html)|Сравнивает, ссылаются ли два объекта на другой объект.|
|[operator ==](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object-operator_eq.html)|Сравнивает две ссылки на объекты, чтобы определить, ссылаются ли они на один и тот же объект.|