using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Helper
{
    public class ExhibitionElementHelper
    {
        public static dataAccess.ExhibitionElement ToEntity(dataTransfer.ExhibitionElement dto)
        {
            return new dataAccess.ExhibitionElement()
            {
                Id = dto.Id,
                Name = dto.Name,
                Description = dto.Description,
                AvailableToBuy = dto.AvailableToBuy,
                ImageUrl = dto.ImageUrl,
                PriceTag = dto.PriceTag,
                Length = dto.Length,
                Width = dto.Width,
                ExhibitionId = dto.ExhibitionId,
            };

        }

        public static dataTransfer.ExhibitionElement ToDto(dataAccess.ExhibitionElement entity)
        {

            return new dataTransfer.ExhibitionElement()
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                AvailableToBuy = entity.AvailableToBuy,
                ImageUrl = entity.ImageUrl,
                PriceTag = entity.PriceTag,
                Length = entity.Length,
                Width = entity.Width,
                ExhibitionId = entity.ExhibitionId,
            };
        }
    }
}

