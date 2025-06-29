using server.Logic.Interfaces.Base;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Logic.Interfaces
{
    public interface IArticleLogic : IBaseLogic<dataTransfer.Article>
    {
    }
}
