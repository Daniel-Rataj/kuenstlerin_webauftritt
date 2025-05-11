using server.Models.DataAccess;
using server.Models.DataAccess.Enums;

namespace server.Models.DataAccess
{
    public class User
    {
        // ID, username, PasswordHash, PasswordSalt, Role
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public UserRole Role { get; set; }
    }
}
