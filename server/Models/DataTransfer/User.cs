namespace server.Models.DataTransfer
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public int Role { get; set; }
    }
}
