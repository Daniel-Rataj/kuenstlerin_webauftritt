using server.Models.DataAccess;
using server.Models.Enums;

namespace server.Models.DataAccess
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid(); // neue Guid-ID
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public UserRole Role { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}