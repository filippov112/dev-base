#example
# <font color="#00b0f0">Практика:</font> ASP, авторизация на основе Claims

Допустим, у нас есть следующий класс, который представляет пользователя:
```csharp
record class Person(string Email, string Password, string City, string Company);
```

```csharp
// Здесь для тестирования механизма авторизации на основе Claims определена условная бд - список пользователей people:
var people = new List<Person> 
{ 
    new Person("tom@gmail.com", "12345", "London", "Microsoft"),
    new Person("bob@gmail.com", "55555", "Лондон", "Google"),
    new Person("sam@gmail.com", "11111", "Berlin", "Microsoft")
};
```

Определим в приложении авторизацию на основе свойств City и Company.

Для настройки авторизации в зависимости от данных пользователя в делегате в методе AddAuthorization устанавливаются две политики доступа - "OnlyForLondon" и "OnlyForMicrosoft":
```csharp
builder.Services.AddAuthorization(opts => {
 
    opts.AddPolicy("OnlyForLondon", policy => {
        policy.RequireClaim(ClaimTypes.Locality, "Лондон", "London");
    });
    opts.AddPolicy("OnlyForMicrosoft", policy => {
        policy.RequireClaim("company", "Microsoft");
    });
});
```

После заполнения и отправки формы логина данные в POST-запросе получает конечная точка `app.MapPost("/login")`, которая получает логин и пароль и по них находит пользователя в списке people. Значения свойств найденного пользователя добавляются в список claims:
```csharp
var claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, person.Email),
    new Claim(ClaimTypes.Locality, person.City),
    new Claim("company", person.Company)
};
var claimsIdentity = new ClaimsIdentity(claims, "Cookies");
var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
```

Для тестирования политик доступа определены две конечных точки:
```csharp
// доступ только для City = London
app.Map("/london", [Authorize(Policy = "OnlyForLondon")]() => "You are living in London");
 
// доступ только для Company = Microsoft
app.Map("/microsoft", [Authorize(Policy = "OnlyForMicrosoft")]() => "You are working in Microsoft");
```

### Пример целиком

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
 
var people = new List<Person> 
{ 
    new Person("tom@gmail.com", "12345", "London", "Microsoft"),
    new Person("bob@gmail.com", "55555", "Лондон", "Google"),
    new Person("sam@gmail.com", "11111", "Berlin", "Microsoft")
};
 
var builder = WebApplication.CreateBuilder();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/login";
        options.AccessDeniedPath = "/login";
    });
builder.Services.AddAuthorization(opts => {
 
    opts.AddPolicy("OnlyForLondon", policy => {
        policy.RequireClaim(ClaimTypes.Locality, "Лондон", "London");
    });
    opts.AddPolicy("OnlyForMicrosoft", policy => {
        policy.RequireClaim("company", "Microsoft");
    });
});
 
var app = builder.Build();
 
app.UseAuthentication();
app.UseAuthorization();
 
app.MapGet("/login", async (HttpContext context) =>
{
    context.Response.ContentType = "text/html; charset=utf-8";
    // html-форма для ввода логина/пароля
    string loginForm = @"<!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8' />
        <title>METANIT.COM</title>
    </head>
    <body>
        <h2>Login Form</h2>
        <form method='post'>
            <p>
                <label>Email</label><br />
                <input name='email' />
            </p>
            <p>
                <label>Password</label><br />
                <input type='password' name='password' />
            </p>
            <input type='submit' value='Login' />
        </form>
    </body>
    </html>";
await context.Response.WriteAsync(loginForm);
});
 
app.MapPost("/login", async (string? returnUrl, HttpContext context) =>
{
    // получаем из формы email и пароль
    var form = context.Request.Form;
    // если email и/или пароль не установлены, посылаем статусный код ошибки 400
    if (!form.ContainsKey("email") || !form.ContainsKey("password"))
        return Results.BadRequest("Email и/или пароль не установлены");
    string email = form["email"];
    string password = form["password"];
 
    // находим пользователя 
    Person? person = people.FirstOrDefault(p => p.Email == email && p.Password == password);
    // если пользователь не найден, отправляем статусный код 401
    if (person is null) return Results.Unauthorized();
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, person.Email),
        new Claim(ClaimTypes.Locality, person.City),
        new Claim("company", person.Company)
    };
    var claimsIdentity = new ClaimsIdentity(claims, "Cookies");
    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
    await context.SignInAsync(claimsPrincipal);
    return Results.Redirect(returnUrl ?? "/");
});
// доступ только для City = London
app.Map("/london", [Authorize(Policy = "OnlyForLondon")]() => "You are living in London");
 
// доступ только для Company = Microsoft
app.Map("/microsoft", [Authorize(Policy = "OnlyForMicrosoft")]() => "You are working in Microsoft");
 
app.Map("/", [Authorize](HttpContext context) =>
{
    var login = context.User.FindFirst(ClaimTypes.Name);
    var city = context.User.FindFirst(ClaimTypes.Locality);
    var company = context.User.FindFirst("company");
    return $"Name: {login?.Value}\nCity: {city?.Value}\nCompany: {company?.Value}";
});
app.MapGet("/logout", async (HttpContext context) =>
{
    await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return "Данные удалены";
});
 
app.Run();

record class Person(string Email, string Password, string City, string Company);
```

