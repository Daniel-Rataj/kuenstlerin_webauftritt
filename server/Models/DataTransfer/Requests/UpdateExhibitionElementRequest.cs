namespace server.Models.Requests
{
    public class UpdateExhibitionElementRequest
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public bool AvailableToBuy { get; set; }

        public int? PriceTag { get; set; }

        public int Width { get; set; }

        public int Length { get; set; }

    }
}
