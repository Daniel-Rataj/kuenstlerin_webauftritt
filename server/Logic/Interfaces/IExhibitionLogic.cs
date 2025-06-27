using Microsoft.AspNetCore.Mvc;
using server.Logic.Interfaces.Base;
using server.Models.DataTransfer;
using server.Models.Requests;
using System.Data;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Logic.Interfaces
{
    public interface IExhibitionLogic : IBaseLogic<dataTransfer.Exhibition>
    {
        Task<dataTransfer.Exhibition> UploadBulkAsync(int exhibitionId, List<IFormFile> files, string exhibitionElementsJson);
        Task<dataTransfer.Exhibition> PublishAsync(int exhibitionId);
        Task<IEnumerable<dataTransfer.Exhibition>> GetAllPublishedAsync();
        Task<bool> DeleteExhibitionElementsBulkAsync(int id, List<int> deletedElementIds);
        Task<bool> UpdateExhibitionElementsBulkAsync(int id, List<UpdateExhibitionElementRequest> updatedElements);
    }
}
