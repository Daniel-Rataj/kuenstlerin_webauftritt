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

        public async Task<IEnumerable<Exhibition>> GetAllPublishedAsync()
        {
            return await _dbSet
                .Where(e => e.Status == Models.Enums.ExhibitionStatus.Public)
                .Include(e => e.ExhibitionElements)
                .ToListAsync();
        }

        public async Task<bool> DeleteExhibitionElementsBulkAsync(int exhibitionId, List<int> deletedElementIds)
        {
            try
            {
                // Load the exhibition with its elements
                var exhibition = await _dbSet
                    .Include(e => e.ExhibitionElements)
                    .FirstOrDefaultAsync(e => e.Id == exhibitionId);

                if (exhibition == null)
                    return false;

                // Filter elements that should be deleted
                var elementsToDelete = exhibition.ExhibitionElements
                    .Where(el => deletedElementIds.Contains(el.Id))
                    .ToList();

                if (elementsToDelete.Count != deletedElementIds.Count)
                {
                    // Mismatch: some elements not found → fail safe
                    return false;
                }

                // Remove elements from context
                _context.ExhibitionElements.RemoveRange(elementsToDelete);

                // Save changes
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
