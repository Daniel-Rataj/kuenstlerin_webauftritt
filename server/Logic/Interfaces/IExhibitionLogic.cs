using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;
using server.Logic.Interfaces.Base;

namespace server.Logic.Interfaces
{
    public interface IExhibitionLogic : IBaseLogic<dataTransfer.Exhibition>
    {
        Task<dataTransfer.ExhibitionElement> UploadImageAsync(int exhibitionId, dataTransfer.ExhibitionElement exhibitionElement);
        Task<dataTransfer.Exhibition> PublishAsync(int exhibitionId);
    }
}
