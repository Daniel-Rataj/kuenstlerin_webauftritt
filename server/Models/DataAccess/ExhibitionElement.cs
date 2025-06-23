namespace server.Models.DataAccess
{
    public class ExhibitionElement
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public bool AvailableToBuy { get; set; }
        public int ExhibitionId { get; set; }
        public int PriceTag { get; set; }
    }
}
