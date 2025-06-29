using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using server.Data;
using server.Logic;
using server.Logic.Base;
using server.Logic.Interfaces;
using server.Logic.Interfaces.Base;
using server.Models;
using server.Models.Enums;
using server.Repositories;
using server.Repositories.Base;
using server.Repositories.Interfaces;
using server.Repositories.Interfaces.Base;
using System.Security.Cryptography;
using System.Text;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

var builder = WebApplication.CreateBuilder(args);

// Register MVC controllers with the service container.
builder.Services.AddControllers();

// Configure JWT Bearer authentication and register it with the service container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

// Register (business)-logic services for dependendency injection
builder.Services.AddScoped<IBaseLogic<dataTransfer.Exhibition>, ExhibitionLogic>();
builder.Services.AddScoped<IUserLogic, UserLogic>();
builder.Services.AddScoped<IAuthLogic, AuthLogic>();
builder.Services.AddScoped<IExhibitionLogic, ExhibitionLogic>();
builder.Services.AddScoped<IExhibitionElementLogic, ExhibitionElementLogic>();
builder.Services.AddScoped<IArticleLogic, ArticleLogic>();
builder.Services.AddScoped<IArticleAssignmentLogic, ArticleAssignmentLogic>();

// Register generic repository services for dependency injection.
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

// Register specific repository implementations.
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IExhibitionRepository, ExhibitionRepository>();
builder.Services.AddScoped<IExhibitionElementRepository, ExhibitionElementRepository>();
builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddScoped<IArticleAssignmentRepository, ArticleAssignmentRepository>();

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
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Künstlerin_Website API´s", Version = "v1" });
    c.OperationFilter<FormFileOperationFilter>();
});

var app = builder.Build();

// Enable public access to uploaded image files stored outside wwwroot.
app.UseStaticFiles();

// This maps the physical "uploads" folder to the virtual "/uploads" URL path,
// allowing images like /uploads/Exhibition_2/xyz.jpg to be served directly.
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "uploads")),
    RequestPath = "/uploads"
});

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    // Apply migrations
    db.Database.Migrate();

    // Only seed if no users exist
    if (!db.Users.Any())
    {
        var username = "admin";
        var password = "admin123";

        using var hmac = new System.Security.Cryptography.HMACSHA512();
        var passwordSalt = hmac.Key;
        var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

        var admin = new dataAccess.User
        {
            Id = Guid.NewGuid(),
            Username = username,
            PasswordSalt = passwordSalt,
            PasswordHash = passwordHash,
            Role = UserRole.Admin
        };

        var refreshToken = new dataAccess.RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            IsRevoked = false,
            UserId = admin.Id
        };

        // Attach user and refresh token
        db.Users.Add(admin);
        db.RefreshTokens.Add(refreshToken);
        db.SaveChanges();

        Console.WriteLine("Admin user seeded with refresh token:");
        Console.WriteLine($" - Username: {username}");
        Console.WriteLine($" - Password: {password}");
        Console.WriteLine($" - RefreshToken: {refreshToken.Token}");
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
