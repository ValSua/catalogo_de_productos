using Aplication.Implements.Productos;
using Aplication.Interface.Productos;
using catalogo_de_productos.Data;
using Infrastructure.Implements.Productos;
using Infrastructure.Interface.Productos;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CatalogoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuración de inyección de dependencias de la capa de Aplicacion 
builder.Services.AddScoped<IProductosService, ProductosService>();

// Configuración de inyección de dependencias de la capa de Infrastructura
builder.Services.AddScoped<IProductosRepository, ProductosRepository>();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<CatalogoDbContext>();
    int retries = 5;
    while (retries > 0)
    {
        try
        {
            dbContext.Database.CanConnect();
            Console.WriteLine("Successfully connected to the database.");
            break;
        }
        catch (Exception ex)
        {
            retries--;
            if (retries == 0) throw;
            Console.WriteLine($"Failed to connect to database. Retrying in 5 seconds... ({retries} attempts left). Error: {ex.Message}");
            Thread.Sleep(5000);
        }
    }
}

app.UseCors("AllowSpecificOrigin");

app.UseSwagger();
app.UseSwaggerUI();

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
