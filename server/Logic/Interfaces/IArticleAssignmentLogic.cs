using Microsoft.AspNetCore.Components.Web;
using server.Logic.Interfaces.Base;
using server.Models.DataTransfer;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Logic.Interfaces
{
    public interface IArticleAssignmentLogic : IBaseLogic<dataTransfer.ArticleAssignment>
    {
    }
}
