#lang #lang-unity

https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.html

`gameObject` - объект к которому прикреплен скрипт (далее `go`)

`go.setActive(bool)` - включение/выключение ==объекта==
`go.co.enabled = false` - отключение какого-либо ==компонента== (`co`- в данном случае)
`go.GetComponent<ИмяКомпонента>()` - обращение к нужному компоненту объекта
`Destroy(go [, time])` - уничтожение объекта (можно задать время)
`transform.parent` - через родителя можно управлять вложенностью объекта (для его привязки или отвязки от префаба к примеру)

`FindObjectOfType<НазваниеОбъектаНаСцене>()` - ищет объект на сцене для управления им изнутри какого-либо другого объекта, к которому привязан скрипт.
`FindObjectsOfType<НазваниеОбъектаНаСцене>()` - ищет **все** объекты с указанным именем

`GameObject.FindGameObjectsWithTag("Enemy")` - поиск всех объектов сцены по тегу

`Instantiate(class_object, position, [rotation, ...])` - создание нового объекта на основе его типа(класса) или префаба. [ДОКА](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object.Instantiate.html)


##### **Properties**
|   |   |
|---|---|
|[activeInHierarchy](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject-activeInHierarchy.html)|Определяет, активен ли GameObject в сцене.|
|[activeSelf](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject-activeSelf.html)|Локальное активное состояние этого GameObject. (Только чтение)|
|[isStatic](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject-isStatic.html)|Получает и задает StaticEditorFlags GameObject.|
|[layer](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject-layer.html)|Слой, в котором находится GameObject.|
|[scene](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject-scene.html)|Сцена, частью которой является GameObject.|
|[sceneCullingMask](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject-sceneCullingMask.html)|Маска отсеивания сцены, которую Unity использует, чтобы определить, в какой сцене визуализировать GameObject.|
|[tag](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject-tag.html)|Тег этого GameObject.|
|[transform](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject-transform.html)|Transform, прикрепленный к этому GameObject.|

##### **Constructors**
|   |   |
|---|---|
|[GameObject](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject-ctor.html)|Создает новый GameObject с именем name.|

##### **Public Methods**
|   |   |
|---|---|
|[AddComponent](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.AddComponent.html)|Добавляет класс компонента типа компонентType в GameObject. Пользователи C# могут использовать общую версию.|
|[BroadcastMessage](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.BroadcastMessage.html)|Вызывает метод с именем MethodName для каждого MonoBehaviour в этом GameObject или любом из его дочерних элементов.|
|[CompareTag](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.CompareTag.html)|Этот GameObject помечен тегом?|
|[GetComponent](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetComponent.html)|Получает ссылку на компонент типа T в указанном GameObject.|
|[GetComponentAtIndex](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetComponentAtIndex.html)|Получает ссылку на компонент по определенному индексу указанного GameObject.|
|[GetComponentCount](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetComponentCount.html)|Возвращает количество компонентов в этом GameObject.|
|[GetComponentInChildren](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetComponentInChildren.html)|Получает ссылку на компонент типа T указанного GameObject или любого дочернего элемента GameObject.|
|[GetComponentIndex](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetComponentIndex.html)|Получает индекс компонента, указанного в указанном GameObject.|
|[GetComponentInParent](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetComponentInParent.html)|Получает ссылку на компонент типа T указанного GameObject или любого родительского объекта GameObject.|
|[GetComponents](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetComponents.html)|Получает ссылки на все компоненты типа T в указанном GameObject.|
|[GetComponentsInChildren](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetComponentsInChildren.html)|Получает ссылки на все компоненты типа T указанного GameObject и любого дочернего элемента GameObject.|
|[GetComponentsInParent](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetComponentsInParent.html)|Получает ссылки на все компоненты типа T указанного GameObject и любого родительского объекта GameObject.|
|[SendMessage](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.SendMessage.html)|Вызывает метод с именем MethodName для каждого MonoBehaviour в этом GameObject.|
|[SendMessageUpwards](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.SendMessageUpwards.html)|Вызывает метод с именем MethodName для каждого MonoBehaviour в этом GameObject и для каждого предка поведения.|
|[SetActive](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.SetActive.html)|Активирует/деактивирует GameObject в зависимости от заданного значения true или false.|
|[TryGetComponent](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.TryGetComponent.html)|Получает компонент указанного типа, если он существует.|

##### **Static Methods**
|   |   |
|---|---|
|[CreatePrimitive](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.CreatePrimitive.html)|Создает GameObject с примитивным средством рендеринга сетки и соответствующим коллайдером.|
|[Find](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.Find.html)|Находит GameObject по имени и возвращает его.|
|[FindGameObjectsWithTag](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.FindGameObjectsWithTag.html)|Возвращает массив активных тегов GameObjects. Возвращает пустой массив, если GameObject не найден.|
|[FindWithTag](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.FindWithTag.html)|Возвращает один активный тег с тегом GameObject. Возвращает ноль, если GameObject не найден.|
|[GetScene](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.GetScene.html)|Возвращает сцену GameObject, заданную идентификатором экземпляра.|
|[InstantiateGameObjects](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.InstantiateGameObjects.html)|Создайте экземпляр GameObject несколько раз по идентификатору экземпляра и заполните NativeArrays, содержащий новые игровые объекты по идентификатору экземпляра и соответствующие им преобразования по идентификатору экземпляра.|
|[SetGameObjectsActive](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/GameObject.SetGameObjectsActive.html)|Активирует/деактивирует игровые объекты по идентификатору экземпляра, в зависимости от заданного значения true или false.|

## **Inherited Members**
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
|[operator \==](https://docs.unity3d.com/2022.3/Documentation/ScriptReference/Object-operator_eq.html)|Сравнивает две ссылки на объекты, чтобы определить, ссылаются ли они на один и тот же объект.|
