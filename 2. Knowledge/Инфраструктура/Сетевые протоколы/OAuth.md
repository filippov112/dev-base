#network
# OAuth

OAuth — это открытый протокол авторизации, который позволяет пользователям предоставлять доступ к своим данным в одном сервисе (ресурсе) другим приложениям без передачи учетных данных (логина и пароля). В основе OAuth лежит использование токенов доступа.

## Как работает OAuth на примере ASP.NET приложения

Допустим, есть веб-приложение на ASP.NET, которое хочет получить доступ к данным пользователя в стороннем API (например, Google API). Процесс выглядит так:

1. **Запрос авторизации**.  
    Приложение направляет пользователя на сервер авторизации (Identity Provider, IdP), передавая:
    
    - идентификатор клиента (Client ID),
    - URL для редиректа после успешного входа (Redirect URI),
    - запрашиваемые разрешения (Scopes),
    - тип ответа (Response Type), например `code` (если используется Authorization Code Flow).
2. **Авторизация пользователя**.  
    Пользователь вводит логин и пароль на сервере IdP, соглашается с предоставлением разрешений.
    
3. **Получение кода авторизации**.  
    После успешной авторизации сервер IdP редиректит пользователя обратно в приложение, передавая одноразовый код авторизации.
    
4. **Обмен кода на токен**.  
    Приложение отправляет этот код на сервер IdP, передавая:
    
    - код авторизации,
    - секретный ключ клиента (Client Secret),
    - идентификатор клиента.  
        В ответ IdP выдает **токен доступа (Access Token)** и **токен обновления (Refresh Token)**.
5. **Доступ к защищенному API**.  
    Приложение использует Access Token в HTTP-запросах к API (добавляет его в заголовок `Authorization: Bearer {access_token}`).
    
6. **Обновление токена**.  
    Когда Access Token истекает, приложение использует Refresh Token для запроса нового Access Token без необходимости заново запрашивать разрешения у пользователя.
    

---

## Виды OAuth токенов

- **Access Token**  
    Используется для аутентификации запросов к защищенному API. Ограничен по времени жизни (например, 1 час). Представляет собой строку (обычно JWT), содержащую информацию о пользователе и разрешениях.
    
- **Refresh Token**  
    Используется для получения нового Access Token без повторной авторизации пользователя. Долгоживущий, но может быть аннулирован сервером IdP.
    
- **ID Token**  
    Применяется в OpenID Connect (расширение OAuth 2.0) и содержит информацию о пользователе (имя, email и т. д.). Кодируется в формате JWT.
    

---

## Реализация в ASP.NET Core

Для использования OAuth можно воспользоваться библиотекой **Microsoft.AspNetCore.Authentication.OAuth** или **IdentityServer**.

Пример настройки аутентификации через Google:

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie()
.AddGoogle(googleOptions =>
{
    googleOptions.ClientId = "your-client-id";
    googleOptions.ClientSecret = "your-client-secret";
});
```

После этого можно вызывать `/signin-google`, чтобы запустить процесс аутентификации.

### Inner links:
[ASP, oAuth 2.0, Identity](practice/C-sharp/ASP,%20oAuth%202.0,%20Identity.md)

### Outer links:

