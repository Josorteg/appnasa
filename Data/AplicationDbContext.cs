using Microsoft.EntityFrameworkCore;
using Models.Entities;
using Microsoft.Extensions.Configuration;



namespace PlanetAdmin.Data
{
    public class ApplicationDBContext : DbContext
    {
        
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            
        }
        public DbSet<Planet> Planets { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // Si la configuración no está configurada, puedes leer del appsettings.json
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlite(configuration.GetConnectionString("PlanetarioDb"));
        }
    }
    }
}
