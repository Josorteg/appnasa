using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using PlanetAdmin.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Inyecta ApplicationDBContext en la ejecucion!!!!
//builder.Services.AddDbContext<ApplicationDBContext>(options =>
//options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var connectionString = builder.Configuration.GetConnectionString("PlanetarioDb");
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlite(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.MapGet("/", async context =>
{
    await context.Response.WriteAsync("Bienvenido a la API. Usa /api/planets para obtener información de los planetas.");
});

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    foreach (var forecas in forecast)
        System.Console.WriteLine(forecas);
    return forecast;
});

app.MapGet("/fuck",() =>
{
    return("fuck you more");
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.MapGet("/files/{fileName}", (string fileName) =>
{
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "files", fileName);
    System.Console.WriteLine(filePath);
    if (!System.IO.File.Exists(filePath))
    {
        System.Console.WriteLine("ERROR : ",filePath);
        return Results.NotFound(); // Retorna 404 si el archivo no existe
    }

    var contentType = "application/octet-stream"; // Cambiar según el tipo de archivo
    return Results.File(filePath, contentType, fileName); // Devuelve el archivo
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
