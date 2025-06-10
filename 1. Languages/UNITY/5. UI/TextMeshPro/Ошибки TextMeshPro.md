#Unity  #Problems

Если при попытке создать переменную класса TextMeshProUGUI Visual Studio выдает ошибку =="The type of namespace name TextMeshProUGUI could not be found"==, то нужно сверху, где строчка "using UnityEngine", дописать еще одну строчку "**using TMPro**".