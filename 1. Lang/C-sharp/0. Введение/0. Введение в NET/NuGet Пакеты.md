#lang #lang-c_sharp

---
> **Nuget** - менеджер пакетов по работе с внешними библиотеками.
> 
> **NuGet-пакет** - единый архивный файл с расширением *.nupkg*, который содержит скомпилированный код в виде библиотек dll и других файлов, используемых в коде. Также пакет включает некоторое описание в виде номера версии и вспомогательной информации.
> 
> **nuget.org** - глобальный репозиторий пакетов.

---
#### Способы работы:

1. В VS управление пакетами проекта осуществляется через контекстное меню в обозревателе решений.
2. Через .NET CLI
	`dotnet add package <package_name>` - установка NuGet пакета
	`dotnet remove package <package_name>` - удаление NuGet пакета
3. Через консольный менеджер пакетов
	`Tools -> NuGet Package Manager -> Package Manager Console.`
	`Install-Package <package_name>` - установка

Присутствие ссылки на пакет в проекте (.csproj)
```xml
<ItemGroup>
    <PackageReference Include="Newtonsoft.Json" Version="13.0.1" />
</ItemGroup>
```