#Unity

# Transform API

## **Self** 

##### **Properties**

|   |   |
|---|---|
|[childCount](https://docs.unity3d.com/ScriptReference/Transform-childCount.html)|Число дочерних элементов родительского Transform.|
|[eulerAngles](https://docs.unity3d.com/ScriptReference/Transform-eulerAngles.html)|Вращение как углы Эйлера в градусах.|
|[forward](https://docs.unity3d.com/ScriptReference/Transform-forward.html)|Возвращает нормализованный вектор, представляющий синюю ось преобразования в мировом пространстве.|
|[hasChanged](https://docs.unity3d.com/ScriptReference/Transform-hasChanged.html)|Изменилось ли преобразование с тех пор, как в последний раз для флага было установлено значение «false»?|
|[hierarchyCapacity](https://docs.unity3d.com/ScriptReference/Transform-hierarchyCapacity.html)|Возможности преобразования структуры данных иерархии преобразования.|
|[hierarchyCount](https://docs.unity3d.com/ScriptReference/Transform-hierarchyCount.html)|Число преобразований в структуре данных иерархии преобразования.|
|[localEulerAngles](https://docs.unity3d.com/ScriptReference/Transform-localEulerAngles.html)|Поворот как углы Эйлера в градусах относительно поворота родительского преобразования.|
|[localPosition](https://docs.unity3d.com/ScriptReference/Transform-localPosition.html)|Положение преобразования относительно родительского преобразования.|
|[localRotation](https://docs.unity3d.com/ScriptReference/Transform-localRotation.html)|Вращение преобразования относительно вращения преобразования родительского элемента.|
|[localScale](https://docs.unity3d.com/ScriptReference/Transform-localScale.html)|Масштаб преобразования относительно родительского объекта GameObjects.|
|[localToWorldMatrix](https://docs.unity3d.com/ScriptReference/Transform-localToWorldMatrix.html)|Матрица, преобразующая точку из локального пространства в мировое пространство (только чтение).|
|[lossyScale](https://docs.unity3d.com/ScriptReference/Transform-lossyScale.html)|Глобальный масштаб объекта (только чтение).|
|[parent](https://docs.unity3d.com/ScriptReference/Transform-parent.html)|Родитель преобразования.|
|[position](https://docs.unity3d.com/ScriptReference/Transform-position.html)|Мировое космическое положение Трансформата.|
|[right](https://docs.unity3d.com/ScriptReference/Transform-right.html)|Красная ось трансформации в мировом пространстве.|
|[root](https://docs.unity3d.com/ScriptReference/Transform-root.html)|Возвращает самое верхнее преобразование в иерархии.|
|[rotation](https://docs.unity3d.com/ScriptReference/Transform-rotation.html)|Кватернион, хранящий вращение Трансформации в мировом пространстве.|
|[up](https://docs.unity3d.com/ScriptReference/Transform-up.html)|Зеленая ось трансформации мирового пространства.|
|[worldToLocalMatrix](https://docs.unity3d.com/ScriptReference/Transform-worldToLocalMatrix.html)|Матрица, преобразующая точку из мирового пространства в локальное пространство (только чтение).|

##### **Public Methods**

|   |   |
|---|---|
|[DetachChildren](https://docs.unity3d.com/ScriptReference/Transform.DetachChildren.html)|Все дети без родителей.|
|[Find](https://docs.unity3d.com/ScriptReference/Transform.Find.html)|Находит дочернего элемента по имени n и возвращает его.|
|[GetChild](https://docs.unity3d.com/ScriptReference/Transform.GetChild.html)|Возвращает дочерний элемент преобразования по индексу.|
|[GetLocalPositionAndRotation](https://docs.unity3d.com/ScriptReference/Transform.GetLocalPositionAndRotation.html)|Получает положение и поворот компонента Transform в локальном пространстве (то есть относительно его родительского преобразования).|
|[GetPositionAndRotation](https://docs.unity3d.com/ScriptReference/Transform.GetPositionAndRotation.html)|Получает положение и вращение компонента Transform в мировом пространстве.|
|[GetSiblingIndex](https://docs.unity3d.com/ScriptReference/Transform.GetSiblingIndex.html)|Получает родственный индекс.|
|[InverseTransformDirection](https://docs.unity3d.com/ScriptReference/Transform.InverseTransformDirection.html)|Преобразует направление из мирового пространства в локальное пространство. Противоположность Transform.TransformDirection.|
|[InverseTransformDirections](https://docs.unity3d.com/ScriptReference/Transform.InverseTransformDirections.html)|Преобразует несколько направлений из мирового пространства в локальное, перезаписывая каждую исходную позицию преобразованной версией. Противоположность Transform.TransformDirections.|
|[InverseTransformPoint](https://docs.unity3d.com/ScriptReference/Transform.InverseTransformPoint.html)|Преобразует положение из мирового пространства в локальное.|
|[InverseTransformPoints](https://docs.unity3d.com/ScriptReference/Transform.InverseTransformPoints.html)|Преобразует несколько позиций из мирового пространства в локальное, перезаписывая каждую исходную позицию преобразованной версией.|
|[InverseTransformVector](https://docs.unity3d.com/ScriptReference/Transform.InverseTransformVector.html)|Преобразует вектор из мирового пространства в локальное пространство. Противоположность Transform.TransformVector.|
|[InverseTransformVectors](https://docs.unity3d.com/ScriptReference/Transform.InverseTransformVectors.html)|Преобразует несколько векторов из мирового пространства в локальное, перезаписывая каждую исходную позицию преобразованной версией. Противоположность Transform.TransformVectors.|
|[IsChildOf](https://docs.unity3d.com/ScriptReference/Transform.IsChildOf.html)|Является ли это преобразование дочерним элементом родителя?|
|[LookAt](https://docs.unity3d.com/ScriptReference/Transform.LookAt.html)|Поворачивает преобразование так, чтобы прямой вектор указывал на текущую позицию /target/.|
|[Rotate](https://docs.unity3d.com/ScriptReference/Transform.Rotate.html)|Используйте Transform.Rotate для поворота игровых объектов различными способами. Вращение часто выражается как угол Эйлера, а не как кватернион.|
|[RotateAround](https://docs.unity3d.com/ScriptReference/Transform.RotateAround.html)|Поворачивает преобразование вокруг оси, проходящей через точку в мировых координатах, на угол в градусах.|
|[SetAsFirstSibling](https://docs.unity3d.com/ScriptReference/Transform.SetAsFirstSibling.html)|Переместите преобразование в начало списка локальных преобразований.|
|[SetAsLastSibling](https://docs.unity3d.com/ScriptReference/Transform.SetAsLastSibling.html)|Переместите преобразование в конец списка локальных преобразований.|
|[SetLocalPositionAndRotation](https://docs.unity3d.com/ScriptReference/Transform.SetLocalPositionAndRotation.html)|Устанавливает положение и поворот компонента Transform в локальном пространстве (т. е. относительно его родительского преобразования).|
|[SetParent](https://docs.unity3d.com/ScriptReference/Transform.SetParent.html)|Установите родителя преобразования.|
|[SetPositionAndRotation](https://docs.unity3d.com/ScriptReference/Transform.SetPositionAndRotation.html)|Устанавливает положение в мировом пространстве и вращение компонента Transform.|
|[SetSiblingIndex](https://docs.unity3d.com/ScriptReference/Transform.SetSiblingIndex.html)|Устанавливает родственный индекс.|
|[TransformDirection](https://docs.unity3d.com/ScriptReference/Transform.TransformDirection.html)|Преобразует направление из локального пространства в мировое.|
|[TransformDirections](https://docs.unity3d.com/ScriptReference/Transform.TransformDirections.html)|Преобразует несколько направлений из локального пространства в мировое, перезаписывая каждое исходное направление преобразованной версией.|
|[TransformPoint](https://docs.unity3d.com/ScriptReference/Transform.TransformPoint.html)|Преобразует положение из локального пространства в мировое.|
|[TransformPoints](https://docs.unity3d.com/ScriptReference/Transform.TransformPoints.html)|Преобразует несколько точек из локального пространства в мировое, перезаписывая каждую исходную точку преобразованной версией.|
|[TransformVector](https://docs.unity3d.com/ScriptReference/Transform.TransformVector.html)|Преобразует вектор из локального пространства в мировое.|
|[TransformVectors](https://docs.unity3d.com/ScriptReference/Transform.TransformVectors.html)|Преобразует несколько векторов из локального пространства в мировое, перезаписывая каждый исходный вектор преобразованной версией.|
|[Translate](https://docs.unity3d.com/ScriptReference/Transform.Translate.html)|Перемещает преобразование в направлении и на расстоянии перевода.|

## **Inherited Members**


##### **Properties**

|   |   |
|---|---|
|[gameObject](https://docs.unity3d.com/ScriptReference/Component-gameObject.html)|Игровой объект, к которому прикреплен этот компонент. Компонент всегда привязан к игровому объекту.|
|[tag](https://docs.unity3d.com/ScriptReference/Component-tag.html)|Тег этого игрового объекта.|
|[transform](https://docs.unity3d.com/ScriptReference/Component-transform.html)|Transform, прикрепленный к этому GameObject.|
|[hideFlags](https://docs.unity3d.com/ScriptReference/Object-hideFlags.html)|Должен ли объект быть скрыт, сохранен вместе со сценой или может быть изменен пользователем?|
|[name](https://docs.unity3d.com/ScriptReference/Object-name.html)|Имя объекта.|

##### **Public Methods**

|   |   |
|---|---|
|[BroadcastMessage](https://docs.unity3d.com/ScriptReference/Component.BroadcastMessage.html)|Вызывает метод с именем MethodName для каждого MonoBehaviour в этом игровом объекте или любом из его дочерних элементов.|
|[CompareTag](https://docs.unity3d.com/ScriptReference/Component.CompareTag.html)|Сверяет тег GameObject по определенному тегу.|
|[GetComponent](https://docs.unity3d.com/ScriptReference/Component.GetComponent.html)|Получает ссылку на компонент типа T на том же GameObject, что и указанный компонент.|
|[GetComponentInChildren](https://docs.unity3d.com/ScriptReference/Component.GetComponentInChildren.html)|Получает ссылку на компонент типа T на том же GameObject, что и указанный компонент, или на любой дочерний элемент GameObject.|
|[GetComponentIndex](https://docs.unity3d.com/ScriptReference/Component.GetComponentIndex.html)|Получает индекс компонента его родительского GameObject.|
|[GetComponentInParent](https://docs.unity3d.com/ScriptReference/Component.GetComponentInParent.html)|Получает ссылку на компонент типа T на том же GameObject, что и указанный компонент, или на любого родительского объекта GameObject.|
|[GetComponents](https://docs.unity3d.com/ScriptReference/Component.GetComponents.html)|Получает ссылки на все компоненты типа T в том же GameObject, что и указанный компонент.|
|[GetComponentsInChildren](https://docs.unity3d.com/ScriptReference/Component.GetComponentsInChildren.html)|Получает ссылки на все компоненты типа T на том же GameObject, что и указанный компонент, и на любого дочернего элемента GameObject.|
|[GetComponentsInParent](https://docs.unity3d.com/ScriptReference/Component.GetComponentsInParent.html)|Получает ссылки на все компоненты типа T на том же GameObject, что и указанный компонент, и на любого родительского объекта GameObject.|
|[SendMessage](https://docs.unity3d.com/ScriptReference/Component.SendMessage.html)|Вызывает метод с именем MethodName для каждого MonoBehaviour в этом игровом объекте.|
|[SendMessageUpwards](https://docs.unity3d.com/ScriptReference/Component.SendMessageUpwards.html)|Вызывает метод с именем MethodName для каждого MonoBehaviour в этом игровом объекте и для каждого предка поведения.|
|[TryGetComponent](https://docs.unity3d.com/ScriptReference/Component.TryGetComponent.html)|Получает компонент указанного типа, если он существует.|
|[GetInstanceID](https://docs.unity3d.com/ScriptReference/Object.GetInstanceID.html)|Получает идентификатор экземпляра объекта.|
|[ToString](https://docs.unity3d.com/ScriptReference/Object.ToString.html)|Возвращает имя объекта.|

##### **Static Methods**

|   |   |
|---|---|
|[Destroy](https://docs.unity3d.com/ScriptReference/Object.Destroy.html)|Удаляет GameObject, компонент или актив.|
|[DestroyImmediate](https://docs.unity3d.com/ScriptReference/Object.DestroyImmediate.html)|Немедленно уничтожает объект obj. Вместо этого настоятельно рекомендуется использовать Destroy.|
|[DontDestroyOnLoad](https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html)|Не уничтожайте целевой объект при загрузке новой сцены.|
|[FindAnyObjectByType](https://docs.unity3d.com/ScriptReference/Object.FindAnyObjectByType.html)|Извлекает любой активный загруженный объект типа Type.|
|[FindFirstObjectByType](https://docs.unity3d.com/ScriptReference/Object.FindFirstObjectByType.html)|Извлекает первый активный загруженный объект типа Type.|
|[FindObjectOfType](https://docs.unity3d.com/ScriptReference/Object.FindObjectOfType.html)|Возвращает первый активный загруженный объект типа Type.|
|[FindObjectsByType](https://docs.unity3d.com/ScriptReference/Object.FindObjectsByType.html)|Получает список всех загруженных объектов типа Тип.|
|[FindObjectsOfType](https://docs.unity3d.com/ScriptReference/Object.FindObjectsOfType.html)|Получает список всех загруженных объектов типа Тип.|
|[Instantiate](https://docs.unity3d.com/ScriptReference/Object.Instantiate.html)|Клонирует оригинал объекта и возвращает клон.|
|[InstantiateAsync](https://docs.unity3d.com/ScriptReference/Object.InstantiateAsync.html)|Делает снимок исходного объекта (который должен быть связан с каким-либо GameObject) и возвращает AsyncInstantiateOperation.|

##### **Operators**

|   |   |
|---|---|
|[bool](https://docs.unity3d.com/ScriptReference/Object-operator_Object.html)|Объект существует?|
|[operator !=](https://docs.unity3d.com/ScriptReference/Object-operator_ne.html)|Сравнивает, ссылаются ли два объекта на другой объект.|
|[operator \==](https://docs.unity3d.com/ScriptReference/Object-operator_eq.html)|Сравнивает две ссылки на объекты, чтобы определить, ссылаются ли они на один и тот же объект.|