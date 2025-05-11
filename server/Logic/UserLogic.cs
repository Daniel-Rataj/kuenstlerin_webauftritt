using server.Logic.Interfaces;
using server.Repositories;
using System.Security.Cryptography;
using System.Text;
using server.Logic.Base;
using server.Models.DataAccess;

public class UserLogic : BaseLogic<User>, IUserLogic
{
    private readonly IUserRepository _userRepository;

    public UserLogic(IUserRepository userRepository) : base(userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await _userRepository.GetByUsernameAsync(username);
    }

    public bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
    {
        using var hmac = new HMACSHA512(storedSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(storedHash);
    }

    public void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using var hmac = new HMACSHA512();
        salt = hmac.Key;
        hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }
}
