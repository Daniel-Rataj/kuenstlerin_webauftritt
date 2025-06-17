using server.Logic.Interfaces.Base;
using System.Data;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Logic.Interfaces
{
    public interface IExhibitionLogic : IBaseLogic<dataTransfer.Exhibition>
    {
        Task<dataTransfer.Exhibition> UploadBulkAsync(int exhibitionId, List<IFormFile> files, string exhibitionElementsJson);
        Task<dataTransfer.Exhibition> PublishAsync(int exhibitionId);
    }
}
