using server.Models.DataAccess;
using server.Repositories.Interfaces.Base;

namespace server.Repositories.Interfaces
{
    public interface IExhibitionRepository : IBaseRepository<Exhibition> 
    {
        Task<bool> DeleteExhibitionElementsBulkAsync(int id, List<int> deletedElementIds);
        Task<IEnumerable<Exhibition>> GetAllPublishedAsync();
    }
}
