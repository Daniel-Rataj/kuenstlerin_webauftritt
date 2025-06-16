using server.Models.Enums;

namespace server.Models.DataAccess
{
    public class Exhibition
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public List<ExhibitionElement> ExhibitionElements { get; set; } = new();

        public ExhibitionStatus Status { get; set; } = ExhibitionStatus.Initialized;
    }
}
