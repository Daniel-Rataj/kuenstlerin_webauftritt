using server.Data;
using server.Models.DataAccess;
using server.Repositories.Base;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class ExhibitionElementRepository : BaseRepository<ExhibitionElement>, IExhibitionElementRepository
    {
        public ExhibitionElementRepository(ApplicationDbContext context) : base(context) { }
    }
}
