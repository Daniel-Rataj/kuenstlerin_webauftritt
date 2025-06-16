using server.Data;
using server.Models.DataAccess;
using server.Repositories.Base;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class ExhibitionRepository : BaseRepository<Exhibition>, IExhibitionRepository
    {
        public ExhibitionRepository(ApplicationDbContext context) : base(context) { }
    }
}
