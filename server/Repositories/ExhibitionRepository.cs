using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.DataAccess;
using server.Repositories.Base;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class ExhibitionRepository : BaseRepository<Exhibition>, IExhibitionRepository
    {
        public ExhibitionRepository(ApplicationDbContext context) : base(context) { }

        public override async Task<Exhibition?> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(e => e.ExhibitionElements)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public override async Task<IEnumerable<Exhibition>> GetAllAsync()
        {
            return await _dbSet
                .Include(e => e.ExhibitionElements)
                .ToListAsync();
        }
    }
}
