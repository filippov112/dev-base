#lang #lang-unity 

---
1. Указываем в настройках проекта нашу организацию (`Services - Ads`) и создаем **Project ID**
2. Включаем там же рекламу (off -> on) и обновляем пакет (install latest version).
3. Создаем класс для управления рекламой и реализуем нужные интерфейсы.
4. Переходим в Unity Dashboard - Ad Units (рекламные блоки)   (там же через `Services - Ads`) и копируем нужные **ID рекламных блоков**


```csharp
public class AdsManager : MonoBehaviour, IUnityAdsInitializationListener, IUnityAdsLoadListener, IUnityAdsShowListener
{
    [SerializeField] GameObject rewardedAdsButton, deathPanel;
    [SerializeField] float timeBtwAd;
    float timerBtwAd;
    [SerializeField] AudioClip popSound;
    
    void Start()
    {
        Advertisement.Initialize("5175129", false, this); // инициализируем рекламное API и передаем ему Game ID (PS - Services - Ads - Game Id (Android/IOS)), отключаем тест-режим (остается заглушка для тестирования при разработке), класс слушатель (this)
        Advertisement.Banner.Load("Banner_Android"); // баннер
        Advertisement.Banner.SetPosition(BannerPosition.TOP_CENTER);
    }
    
    void Update()
    {
        timerBtwAd += Time.deltaTime;
        if(timerBtwAd >= timeBtwAd)
        {
            Advertisement.Show("Interstitial_Android", this); // полноэкранка
            timerBtwAd = 0;
        }
    }

    public void ShowAd()
    {
        Advertisement.Show("Rewarded_Android", this); // указываем id рекламного блока
        SoundManager.instance.PlayerSound(popSound);
    }

    public void OnInitializationComplete()
    {
        Debug.Log("Complete");
    }

    public void OnInitializationFailed(UnityAdsInitializationError error, string message)
    {
    }

    public void OnUnityAdsAdLoaded(string placementId)
    {
    }

    public void OnUnityAdsFailedToLoad(string placementId, UnityAdsLoadError error, string message)
    {
    }

    public void OnUnityAdsShowClick(string placementId)
    {
    }

    public void OnUnityAdsShowComplete(string placementId, UnityAdsShowCompletionState showCompletionState)
    {
        if(placementId == "Rewarded_Android") // проверяем тип рекламы, просмотренный пользователем
        {
            rewardedAdsButton.SetActive(false);
            deathPanel.SetActive(false);
            Player.instance.gameObject.SetActive(true);
            Player.instance.AddHealth(Player.instance.maxHealth);
        }
    }
    
    public void OnUnityAdsShowFailure(string placementId, UnityAdsShowError error, string message)
    {
    }
    
    public void OnUnityAdsShowStart(string placementId)
    {
    }

}
```