using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repositories.Base;
using server.Repositories.Interfaces.Base;
using server.Models.DataAccess.Enums;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;
using server.Logic.Interfaces;
using server.Logic.Base;
using server.Logic.Interfaces.Base;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Register MVC controllers with the service container.
builder.Services.AddControllers();

// Configure JWT Bearer authentication and register it with the service container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // Validate the security key used to sign the token
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            ),

            // Skip issuer and audience validation
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// Register (business)-logic services for dependendency injection
builder.Services.AddScoped(typeof(IBaseLogic<>), typeof(BaseLogic<>));
builder.Services.AddScoped<IUserLogic, UserLogic>();
builder.Services.AddScoped<IAuthLogic, AuthLogic>();

// Register generic repository services for dependency injection.
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

// Register specific repository implementations.
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Register the application's database context and configure it to use SQLite.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure CORS policy to allow unrestricted access for development purposes.
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy
            .AllowAnyOrigin()  // Allow requests from any origin (not recommended for production)
            .AllowAnyHeader()  // Allow all HTTP headers
            .AllowAnyMethod(); // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    // Resolve the application database context from the DI container
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    // Ensure the database is created and migrations are applied
    db.Database.Migrate();

    // Check if any users already exist in the database
    if (!db.Users.Any())
    {
        // Create password hash and salt for the default admin user
        using var hmac = new System.Security.Cryptography.HMACSHA512();
        var password = "admin123"; // Default password – change this after first login

        dataAccess.User admin = new dataAccess.User
        {
            Username = "admin",
            PasswordSalt = hmac.Key,
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)),
            Role = UserRole.Admin
        };

        // Add the admin user to the database and save changes
        db.Users.Add(admin);
        db.SaveChanges();

        Console.WriteLine("Admin user seeded successfully: username = 'admin', password = 'admin123'");
    }
    else
    {
        Console.WriteLine("Users already exist in the database – skipping admin seeding.");
    }
}

// Configures the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    Console.WriteLine("Development environment is active");
    app.UseCors("DevCors");
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    Console.WriteLine("Production environment is active");

}

// For Development Purposes, we dont Use HttpsRedirection
//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
