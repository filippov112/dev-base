#lang #lang-unity 

---
**Addressables** — это мощная система управления ресурсами в Unity, которая предоставляет ==гибкий и оптимизированный способ загрузки и управления ассетами== в вашем проекте. 
Работает поверх **AssetBundles**.


### Преимущества использования Addressables
1. **Гибкость**:
   - Addressables значительно упрощает работу с ресурсами в больших проектах, позволяя легко управлять загрузкой, обновлением и удалением ассетов.
2. **Оптимизация**:
   - Асинхронная загрузка и управление памятью позволяют улучшить производительность игры, особенно на мобильных устройствах и в проектах с большим количеством ассетов.
3. **Обновление контента**:
   - Возможность обновления ресурсов после сборки делает Addressables незаменимым инструментом для поддержки игры после релиза.


### Основные возможности Addressables

1. **Асинхронная загрузка**:
   - Позволяет избежать зависания игры при загрузке больших ассетов.
2. **Управление памятью**:
   - Система автоматически освобождает ресурсы, которые больше не используются, что помогает оптимизировать потребление памяти.
3. **Поддержка зависимостей**:
   - Addressables учитывает зависимости между ассетами и загружает их в правильном порядке, избегая проблем с отсутствующими ресурсами.
4. **Распределение по пакетам (Asset Bundles)**:
   - Addressables позволяет легко создавать Asset Bundles и управлять ими, распределяя ресурсы по логическим группам.
5. **Работа с контентом после сборки**:
   - Вы можете обновлять, загружать и управлять контентом без необходимости пересобирать весь проект, что особенно полезно для патчей и обновлений.
6. **Кроссплатформенность**:
   - Addressables поддерживает различные платформы, что упрощает управление ресурсами в мультиплатформенных проектах.

### Как работать с Addressables

1. **Установка Addressables**:
   - Установите пакет Addressables через Unity Package Manager.

2. **Маркировка ассетов как Addressable**:
   - После установки пакета вы можете отметить любой ассет как "Addressable" в инспекторе, установив соответствующий флажок. Это позволяет управлять ассетами через систему Addressables.
   - Также после изменений в ресурсах необходимо пересобирать сборку Addressables, из которой игра будет брать ресурсы.

3. **Создание групп**:
   - Ассеты можно организовывать в группы, которые называются **Addressable Groups** (*Window-Asset Management-Addressaables-Groups*). Группы могут быть настроены для различных целей, таких как разные конфигурации сборок, платформы, или уровни в игре.
   - Есть 3 режима работы Addressables (Play mode script) - Asset Database (без необходимости выполнять сборку групп), Simulate Groups (также без сборки но с проверками на группы как я понял), Existing Build (требует сборки ресурсов в группы)
   - Сборка в группы осуществляется в Builds - New Build - Default Build Script

4. **Загрузка ассетов**:
   - Загрузка ассетов с использованием Addressables происходит через их адрес или ключ.

5. **Освобождение ресурсов**:
   - Addressables также предоставляет методы для освобождения загруженных ресурсов.
```csharp
Addressables.Release(obj); // Освобождает ресурс из памяти. Имеет смысл использовать в OnDisable. Удаляет 1 загруженную копию ассета (т.е. если загружено несколько копий одного ресурса, нужно несколько раз вызвать метод).
```

6. **Профили и настройки**:
   - Вы можете создавать разные профили для различных конфигураций, например, для разработки, тестирования и релиза. Это позволяет легко переключаться между средами и изменять поведение загрузки ресурсов.

### Настройка для загрузки ресурсов по сети
`Assets/AddressableAssetsData/AddressableAssetSettings.asset`- файл настроек пакета
`Window-Asset Management-Addressables-Profiles` - константы путей

1. Включаем использование удаленного каталога ресурсов (Build Remote Catalog).
2. Настраиваем внутренний каталог для загружаемых ресурсов (Build path) и ссылку до удаленного каталога, откуда будут браться ресурсы (Load path).
3. Добавляем свои группы и настраиваем Build и Load path каждой группы.

#### Пример кода
```csharp
using UnityEngine;
using UnityEngine.AddressableAssets;

// Класс результат запросов - AsyncOperationHandle.
// Класс для работы со ссылками - AssetReference. -- преимущественный способ взаимодействия, т.к. хранит ID ресурса, позволяя перестраивать хранилище ресурсов без необходимости редакта путей в коде.


// Можно работать через события как в примере ниже, подписываясь на Completed.
public class Example : MonoBehaviour
{
	public string assetAddress;

	void Start()
	{
		Addressables.LoadAssetAsync<GameObject>(assetAddress).Completed += OnLoadDone; // Можно пользоваться статическими методами класса Addressables как здесь передавая аддресс закрепленный за ресурсом, а можно через методы класса AssetReference как в примерах ниже.
	}

	private void OnLoadDone(UnityEngine.ResourceManagement.AsyncOperations.AsyncOperationHandle<GameObject> obj)
	{
		if (obj.Status == UnityEngine.ResourceManagement.AsyncOperations.AsyncOperationStatus.Succeeded)
		{
			Instantiate(obj.Result);
		}
	}
}

// Можно через ассинхронные методы, ожидая выполнения таски запроса (obj.Task).
public class Manager2: MonoBehaviour
{
	[SerializeField] private AssetReference sprite; // - любой ресурс (ссылку на ресурс) зарегистрированный в Addressables можно хранить в переменных класса AssetReference
	[SerializeField] private Image image;
	
	private async void Start()
	{
		AsyncOperationHandle<Sprite> handle = sprite.LoadAssetAsync<Sprite>(); // Если не указывать универсальный тип для AOH, то нужно будет явно преобразовывать Result к нужному классу.
		await handle.Task;
		if (handle.Status == AsyncOperationStatus.Succeeded)
		{
			Sprite sprite = handle.Result;
			image.sprite = sprite;
			Addressables.Release(handle);
		}
	}
}


// Можно работать через корутины
public class Manager2: MonoBehaviour
{
	[SerializeField] private AssetReference sprite; // - любой ресурс (ссылку на ресурс) зарегистрированный в Addressables можно хранить в переменных класса AssetReference
	[SerializeField] private Image image;
	
	private IEnumerator Start()
	{
		AsyncOperationHandle<Sprite> handle = sprite.LoadAssetAsync<Sprite>(); // Если не указывать универсальный тип для AOH, то нужно будет явно преобразовывать Result к нужному классу.
		yield return handle;
		if (handle.Status == AsyncOperationStatus.Succeeded)
		{
			Sprite sprite = handle.Result;
			image.sprite = sprite;
			Addressables.Release(handle);
		}
	}
}


// Для особых случаев, если требуется синхронная загрузка ресурса можно использовать метод WaitForCompletion() класса AOH.



```




## Примеры использования

### 1. **Загрузка и использование ассета по адресу**

Самый базовый пример загрузки ассета — это загрузка и использование ассета, отмеченного как Addressable, по его адресу.

```csharp
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;

public class LoadAssetExample : MonoBehaviour
{
    public string assetAddress;  // Адрес ассета, как он указан в Addressables

    void Start()
    {
        Addressables.LoadAssetAsync<GameObject>(assetAddress).Completed += OnAssetLoaded;
    }

    private void OnAssetLoaded(AsyncOperationHandle<GameObject> obj)
    {
        if (obj.Status == AsyncOperationStatus.Succeeded)
        {
            GameObject loadedPrefab = obj.Result;
            Instantiate(loadedPrefab);  // Инстанцируем загруженный объект в сцене
        }
        else
        {
            Debug.LogError("Failed to load asset: " + assetAddress);
        }
    }
}
```

### 2. **Асинхронная загрузка ассета и ожидание завершения**

Асинхронная загрузка ассета с использованием `await` в `async` методах, что позволяет более удобно работать с асинхронными операциями.

```csharp
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.AddressableAssets;

public class AsyncLoadExample : MonoBehaviour
{
    public string assetAddress;

    async void Start()
    {
        GameObject loadedPrefab = await LoadAssetAsync<GameObject>(assetAddress);
        if (loadedPrefab != null)
        {
            Instantiate(loadedPrefab);
        }
    }

    private async Task<T> LoadAssetAsync<T>(string address) where T : UnityEngine.Object
    {
        var handle = Addressables.LoadAssetAsync<T>(address);
        await handle.Task;
        return handle.Status == UnityEngine.ResourceManagement.AsyncOperations.AsyncOperationStatus.Succeeded ? handle.Result : null;
    }
}
```

### 3. **Загрузка префаба и его инстанцирование**

Этот пример показывает, как загружать и инстанцировать префаб напрямую через Addressables.

```csharp
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;

public class InstantiatePrefabExample : MonoBehaviour
{
    public string prefabAddress;

    void Start()
    {
        Addressables.InstantiateAsync(prefabAddress).Completed += OnPrefabInstantiated;
    }

    private void OnPrefabInstantiated(AsyncOperationHandle<GameObject> obj)
    {
        if (obj.Status == AsyncOperationStatus.Succeeded)
        {
            Debug.Log("Prefab instantiated successfully!");
        }
        else
        {
            Debug.LogError("Failed to instantiate prefab: " + prefabAddress);
        }
    }
}
```

### 4. **Освобождение загруженных ресурсов**

Когда ассет больше не нужен, его можно освободить для освобождения памяти.

```csharp
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;

public class ReleaseAssetExample : MonoBehaviour
{
    public string assetAddress;
    private AsyncOperationHandle<GameObject> handle;

    void Start()
    {
        handle = Addressables.LoadAssetAsync<GameObject>(assetAddress);
        handle.Completed += OnAssetLoaded;
    }

    private void OnAssetLoaded(AsyncOperationHandle<GameObject> obj)
    {
        if (obj.Status == AsyncOperationStatus.Succeeded)
        {
            GameObject loadedAsset = obj.Result;
            // Используем ассет...

            // Освобождаем ресурс после его использования
            Addressables.Release(handle);
        }
    }
}
```

### 5. **Загрузка сцены через Addressables**

Addressables также может использоваться для загрузки и выгрузки сцен.

```csharp
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;
using UnityEngine.SceneManagement;

public class LoadSceneExample : MonoBehaviour
{
    public string sceneAddress;

    void Start()
    {
        Addressables.LoadSceneAsync(sceneAddress, LoadSceneMode.Additive).Completed += OnSceneLoaded; // Addititve - режим загрузки, когда уже загруженные сцены не трогаются, Single - когда загружаемая заменяет уже загруженную.
    }

    private void OnSceneLoaded(AsyncOperationHandle<SceneInstance> obj)
    {
        if (obj.Status == AsyncOperationStatus.Succeeded)
        {
            Debug.Log("Scene loaded successfully!");
        }
        else
        {
            Debug.LogError("Failed to load scene: " + sceneAddress);
        }
    }

    public void UnloadScene()
    {
        Addressables.UnloadSceneAsync(sceneAddress);
    }
}
```

### 6. **Загрузка нескольких ассетов**

Иногда необходимо загрузить сразу несколько ассетов, например, для создания списка объектов.

```csharp
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;

public class LoadMultipleAssetsExample : MonoBehaviour
{
    public List<string> assetAddresses;

    void Start()
    {
        foreach (string address in assetAddresses)
        {
            Addressables.LoadAssetAsync<GameObject>(address).Completed += OnAssetLoaded;
        }
    }

    private void OnAssetLoaded(AsyncOperationHandle<GameObject> obj)
    {
        if (obj.Status == AsyncOperationStatus.Succeeded)
        {
            GameObject loadedPrefab = obj.Result;
            Instantiate(loadedPrefab);  // Инстанцируем каждый загруженный объект
        }
        else
        {
            Debug.LogError("Failed to load asset.");
        }
    }
}
```

### 7. **Загрузка ассета по ключу (Label)**

Addressables поддерживает загрузку ассетов по ключам, что полезно для группировки и фильтрации.

```csharp
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;

public class LoadByLabelExample : MonoBehaviour
{
    public string label;

    void Start()
    {
        Addressables.LoadAssetsAsync<GameObject>(label, null).Completed += OnAssetsLoaded;
    }

    private void OnAssetsLoaded(AsyncOperationHandle<IList<GameObject>> obj)
    {
        if (obj.Status == AsyncOperationStatus.Succeeded)
        {
            foreach (GameObject prefab in obj.Result)
            {
                Instantiate(prefab);  // Инстанцируем все загруженные объекты
            }
        }
        else
        {
            Debug.LogError("Failed to load assets by label.");
        }
    }
}
```
