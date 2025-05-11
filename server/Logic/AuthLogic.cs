using Microsoft.IdentityModel.Tokens;
using server.Logic.Interfaces;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using server.Models.DataTransfer.Responses;

public class AuthLogic : IAuthLogic
{
    private readonly IUserLogic _userLogic;
    private readonly IConfiguration _config;

    public AuthLogic(IUserLogic userLogic, IConfiguration config)
    {
        _userLogic = userLogic;
        _config = config;
    }

    public async Task<LoginResponse?> LoginAsync(string username, string password)
    {
        dataAccess.User? user = await _userLogic.GetByUsernameAsync(username);
        if (user == null || !_userLogic.VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            return null;

        var token = GenerateJwtToken(user);

        return new LoginResponse
        {
            Token = token,
            User = new dataTransfer.User
            {
                Id = user.Id,
                Username = user.Username,
                Role = (int) user.Role
            }
        };
    }

    private string GenerateJwtToken(dataAccess.User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
