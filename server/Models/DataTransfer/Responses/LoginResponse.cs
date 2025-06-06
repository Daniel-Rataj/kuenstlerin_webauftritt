using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;
namespace server.Models.DataTransfer.Responses
{
    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public dataTransfer.User User { get; set; } = new();
    }
}
