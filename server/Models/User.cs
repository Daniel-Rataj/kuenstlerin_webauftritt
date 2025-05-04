using server.Models.Enums;

namespace server.Models
{
    public class User
    {
        // ID, username, PasswordHash, PasswordSalt, Role
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public byte[] Passwordhash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public UserRole Role { get; set; }
    }
}
