using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.DataAccess;
using server.Repositories.Base;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(ApplicationDbContext context) : base(context) { }

    public Task<User?> GetByUsernameAsync(string username)
    {
        return _dbSet.SingleOrDefaultAsync(u => u.Username == username);
    }
}