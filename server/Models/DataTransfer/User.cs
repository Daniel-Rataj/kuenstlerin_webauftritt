using server.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace server.Models.DataTransfer
{
    public class User
    {
        public Guid? Id { get; set; }
        
        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public UserRole Role { get; set; }
    }
}
