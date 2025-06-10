#example

#### Установка и настройка backend

1. Установить .NET SDK.
2. Создать проект WebAPI:
    ```sh
    dotnet new webapi -n TodoApi
    cd TodoApi
    ```

3. Создать `Program.cs`:
	```csharp
	var builder = WebApplication.CreateBuilder(args);
	
	builder.Services.AddCors(options =>
	{
	    options.AddPolicy("AllowAll",
	        policy => policy.AllowAnyOrigin()
	                        .AllowAnyMethod()
	                        .AllowAnyHeader());
	});
	
	builder.Services.AddControllers();
	builder.Services.AddEndpointsApiExplorer();
	builder.Services.AddSwaggerGen();
	
	var app = builder.Build();
	
	if (app.Environment.IsDevelopment())
	{
	    app.UseSwagger();
	    app.UseSwaggerUI();
	}
	
	app.UseCors("AllowAll");
	app.UseAuthorization();
	app.MapControllers();
	
	app.Run();
	```

4. Создать `TodoItem.cs`: Модель данных
	```csharp
	public class TodoItem
	{
	    public int Id { get; set; }
	    public string Title { get; set; } = string.Empty;
	    public bool IsCompleted { get; set; }
	}
	```

5. Создать `TodoController.cs`: Контроллер
	```csharp
	[Route("api/todos")]
	[ApiController]
	public class TodoController : ControllerBase
	{
	    private static List<TodoItem> _todos = new();
	
	    [HttpGet]
	    public ActionResult<IEnumerable<TodoItem>> Get() => _todos;
	
	    [HttpPost]
	    public ActionResult<TodoItem> Create(TodoItem todo)
	    {
	        todo.Id = _todos.Count + 1;
	        _todos.Add(todo);
	        return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
	    }
	
	    [HttpPut("{id}")]
	    public IActionResult Update(int id, TodoItem updatedTodo)
	    {
	        var todo = _todos.FirstOrDefault(t => t.Id == id);
	        if (todo == null) return NotFound();
	        todo.Title = updatedTodo.Title;
	        todo.IsCompleted = updatedTodo.IsCompleted;
	        return NoContent();
	    }
	
	    [HttpDelete("{id}")]
	    public IActionResult Delete(int id)
	    {
	        var todo = _todos.FirstOrDefault(t => t.Id == id);
	        if (todo == null) return NotFound();
	        _todos.Remove(todo);
	        return NoContent();
	    }
	}
	```

6. Запустить сервер:
	```sh
	dotnet run
	```
