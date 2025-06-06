using Microsoft.EntityFrameworkCore;
using server.Data;
using dataAccess = server.Models.DataAccess;
using server.Repositories.Base;

public class UserRepository : BaseRepository<dataAccess.User>, IUserRepository
{
    public UserRepository(ApplicationDbContext context) : base(context) { }

    public Task<dataAccess.User?> GetByUsernameAsync(string username)
    {
        return _dbSet.SingleOrDefaultAsync(user => user.Username == username);
    }
}