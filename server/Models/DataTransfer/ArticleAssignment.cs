namespace server.Models.DataTransfer
{
    public class ArticleAssignment
    {
        public int Id { get; set; }
        public int PageBlockId { get; set; }
        public int ArticleId { get; set; }
        public bool ShowButton { get; set; }
        public string ButtonTargetRoute { get; set; } = string.Empty;
    }
}
