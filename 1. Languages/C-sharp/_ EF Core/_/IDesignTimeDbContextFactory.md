#lang #lang-c_sharp

---
`IDesignTimeDbContextFactory` - DI сервис - фабрика контекстов БД.
Требуется для ручного запуска миграций, когда конструктор контекста БД принимает `DbContextOptions`.

Пример реализации:
```csharp
public class SampleContextFactory : IDesignTimeDbContextFactory<ApplicationContext>
{
    public ApplicationContext CreateDbContext(string[] args)
    {
        //var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();
       
        //ConfigurationBuilder builder = new ConfigurationBuilder();
        //builder.SetBasePath(Directory.GetCurrentDirectory());
        //builder.AddJsonFile("appsettings.json");
        //IConfigurationRoot config = builder.Build();
 
        //string connectionString = config.GetConnectionString("DefaultConnection");
        //optionsBuilder.UseSqlite(connectionString);
        return new ApplicationContext(optionsBuilder.Options);
    }
}
```


### Outer links: