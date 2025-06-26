using Microsoft.EntityFrameworkCore;
using server.Data;
using dataAccess = server.Models.DataAccess;
using server.Repositories.Base;
using server.Models.DataAccess;

public class UserRepository : IUserRepository
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<dataAccess.User> _dbSet;

    public UserRepository(ApplicationDbContext context) 
    {
        _context = context;
        _dbSet = context.Set<dataAccess.User>();
    }
    public async Task<dataAccess.User?> GetByUsernameAsync(string username)
    {
        return await _dbSet.SingleOrDefaultAsync(user => user.Username == username);
    }

    public async Task<IEnumerable<User>> GetAllAsync() => await _dbSet.ToListAsync();

    public async Task<dataAccess.User?> GetByGuidAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }
    public async Task<User> CreateWithGuidAsync(User entity)
    {
        _dbSet.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<User> UpdateWithGuidAsync(User entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteWithGuidAsync(Guid id)
    {
        var entity = await _dbSet.FindAsync(id);
        if (entity == null) return false;

        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }
}