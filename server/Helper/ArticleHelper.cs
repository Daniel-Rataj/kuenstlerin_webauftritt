using Microsoft.AspNetCore.Components.Web;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Helper
{
    public class ArticleHelper
    {
        public static dataAccess.Article ToEntity(dataTransfer.Article dto)
        {
            return new dataAccess.Article()
            {
                Id = dto.Id,
                Title = dto.Title,
                Content = dto.Content,
            };
        }

        public static dataTransfer.Article ToDto(dataAccess.Article entity)
        {
            return new dataTransfer.Article
            {
                Id = entity.Id,
                Title = entity.Title,
                Content = entity.Content,
            };
        }

        public static void MapToExistingEntity(dataTransfer.Article dto, dataAccess.Article entity)
        {
            entity.Title = dto.Title;
            entity.Content = dto.Content;
        }
    }
}
