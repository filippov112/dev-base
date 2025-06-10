1. **Установить глобальный инструмент EF Core**  
    ```sh
    dotnet tool install --global dotnet-ef
    ```
    
2. **Проверить, что инструмент установлен**
    ```sh
    dotnet ef --version
    ```
    
3. **Убедиться, что в проект добавлены пакеты EF Core**
    ```sh
    dotnet add package Microsoft.EntityFrameworkCore.Design
    dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
    ```

4. **Добавить класс контекста БД**
    ```csharp
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Item> Items { get; set; }
    }
    ```
    
5. **Настроить подключение в `appsettings.json`**
    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "Host=localhost;Port=5432;Database=TestDb;Username=postgres;Password=yourpassword"
      }
    }
    ```
    
6. **Зарегистрировать контекст в `Program.cs`**
    ```csharp
    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
    builder.Services.AddControllers();
    var app = builder.Build();
    app.MapControllers();
    app.Run();
    ```

7. Добавить модель данных и методы работы с ней.
    ```csharp
	    // Модель данных
	public class Item
	{
	    public int Id { get; set; }
	    public string Name { get; set; } = string.Empty;
	}
	
	// Контроллер API
	[ApiController]
	[Route("api/[controller]")]
	public class ItemsController : ControllerBase
	{
	    private readonly AppDbContext _context;
	
	    public ItemsController(AppDbContext context)
	    {
	        _context = context;
	    }
	
	    [HttpGet]
	    public async Task<ActionResult<IEnumerable<Item>>> GetItems()
	    {
	        return await _context.Items.ToListAsync();
	    }
	
	    [HttpPost]
	    public async Task<ActionResult<Item>> CreateItem(Item item)
	    {
	        _context.Items.Add(item);
	        await _context.SaveChangesAsync();
	        return CreatedAtAction(nameof(GetItems), new { id = item.Id }, item);
	    }
	}
	
	// Настройки в Program.cs
	var builder = WebApplication.CreateBuilder(args);
	builder.Services.AddDbContext<AppDbContext>(options =>
	    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
	builder.Services.AddControllers();
	builder.Services.AddEndpointsApiExplorer();
	builder.Services.AddSwaggerGen();
	
	var app = builder.Build();
	
	if (app.Environment.IsDevelopment())
	{
	    app.UseSwagger();
	    app.UseSwaggerUI();
	}
	
	app.UseAuthorization();
	app.MapControllers();
	app.Run();
	```
8. **Создать и применить миграцию**
    ```sh
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    ```
