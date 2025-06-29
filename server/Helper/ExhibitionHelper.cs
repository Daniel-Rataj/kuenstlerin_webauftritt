using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Helper
{
    public class ExhibitionHelper
    {
        public static dataAccess.Exhibition ToEntity(dataTransfer.Exhibition dto)
        {
            var mappedExhibitionElements = dto.ExhibitionElements?
                .Where(e => e != null)
                .Select(ExhibitionElementHelper.ToEntity)
                .ToList() ?? new List<dataAccess.ExhibitionElement>();

            return new dataAccess.Exhibition()
            {
                Id = dto.Id,
                Title = dto.Title,
                Date = dto.Date,
                ExhibitionElements = mappedExhibitionElements,
                Status = dto.Status,
            };
        }

        public static dataTransfer.Exhibition ToDto(dataAccess.Exhibition entity)
        {
            var mappedElements = entity.ExhibitionElements?
                .Where(e => e != null)
                .Select(ExhibitionElementHelper.ToDto)
                .ToList() ?? new List<dataTransfer.ExhibitionElement>();

            return new dataTransfer.Exhibition
            {
                Id = entity.Id,
                Title = entity.Title,
                Date = entity.Date,
                ExhibitionElements = mappedElements,
                Status = entity.Status,
            };
        }

        internal static void MapToExistingEntity(dataTransfer.Exhibition dto, dataAccess.Exhibition entity)
        {
            entity.Title = dto.Title;
            entity.Date = dto.Date;
            entity.Status = dto.Status;

            // ExhibitionElements Mapping optional, je nach Logik (merge/replace)
        }
    }
}