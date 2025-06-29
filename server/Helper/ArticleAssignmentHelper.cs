using Microsoft.AspNetCore.Components.Web;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Helper
{
    public class ArticleAssignmentHelper
    {
        public static dataAccess.ArticleAssignment ToEntity(dataTransfer.ArticleAssignment dto)
        {
            return new dataAccess.ArticleAssignment()
            {
                Id = dto.Id,
                ArticleId = dto.ArticleId,
                PageBlockId = dto.PageBlockId,
                ShowButton = dto.ShowButton,
                ButtonTargetRoute = dto.ButtonTargetRoute
            };
        }

        public static dataTransfer.ArticleAssignment ToDto(dataAccess.ArticleAssignment entity)
        {
            return new dataTransfer.ArticleAssignment
            {
                Id = entity.Id,
                ArticleId = entity.ArticleId,
                PageBlockId = entity.PageBlockId,
                ShowButton = entity.ShowButton,
                ButtonTargetRoute = entity.ButtonTargetRoute
            };
        }

        public static void MapToExistingEntity(dataTransfer.ArticleAssignment dto, dataAccess.ArticleAssignment entity)
        {
            entity.ArticleId = dto.ArticleId;
            entity.PageBlockId = dto.PageBlockId;
            entity.ShowButton = dto.ShowButton;
            entity.ButtonTargetRoute = dto.ButtonTargetRoute;
        }
    }
}
