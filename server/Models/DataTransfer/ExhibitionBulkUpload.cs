namespace server.Models.DataTransfer
{
    public class ExhibitionBulkUpload
    {
        public List<IFormFile> Files { get; set; } = new();
        public string ExhibitionElementsJson { get; set; } = string.Empty;
    }
}
