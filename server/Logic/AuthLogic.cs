using Microsoft.IdentityModel.Tokens;
using server.Logic.Interfaces;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using server.Models.DataTransfer.Responses;
using Microsoft.EntityFrameworkCore;
using server.Models.DataAccess;
using System.Security.Cryptography;
using server.Logic.Base;
using server.Helper;

public class AuthLogic : IAuthLogic
{
    private readonly IUserLogic _userLogic;
    private readonly IConfiguration _config;
    private readonly IRefreshTokenRepository _refreshTokenRepository;

    public AuthLogic(IUserLogic userLogic, IConfiguration config, IRefreshTokenRepository refreshTokenRepository)
    {
        _userLogic = userLogic;
        _config = config;
        _refreshTokenRepository = refreshTokenRepository;
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
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<LoginResponse?> LoginAsync(string username, string password)
    {
        dataAccess.User? user = await _userLogic.GetByUsernameAsync(username);
        if (user == null || !AuthHelper.VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            return null;

        var token = GenerateJwtToken(user);

        return new LoginResponse
        {
            Token = token,
            User = new dataTransfer.User
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role
            }
        };
    }

    public async Task<RefreshTokenResponse?> RefreshTokenAsync(string refreshTokenValue)
    {
        var token = await _refreshTokenRepository.GetByTokenAsync(refreshTokenValue);

        if (token == null || token.IsRevoked || token.ExpiresAt < DateTime.UtcNow)
            return null;

        var user = token.User;
        var newAccessToken = GenerateJwtToken(user);
        var newRefreshToken = GenerateSecureRefreshToken();

        token.IsRevoked = true;
        await _refreshTokenRepository.UpdateAsync(token);

        await StoreRefreshTokenAsync(user.Id, newRefreshToken);

        return new RefreshTokenResponse
        {
            Token = newAccessToken,
            RefreshToken = newRefreshToken,
            User = new dataTransfer.User
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role
            }
        };
    }

    private string GenerateSecureRefreshToken()
    {
        var randomBytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }

    private async Task StoreRefreshTokenAsync(Guid userId, string token)
    {
        var refreshToken = new RefreshToken
        {
            Token = token,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            IsRevoked = false,
            UserId = userId
        };

        await _refreshTokenRepository.CreateAsync(refreshToken);
    }
}
