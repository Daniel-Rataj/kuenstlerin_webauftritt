using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.DataAccess;
using server.Repositories.Base;

public class RefreshTokenRepository : BaseRepository<RefreshToken>, IRefreshTokenRepository
{

    public RefreshTokenRepository(ApplicationDbContext context) : base(context) { }


    public async Task<RefreshToken?> GetByTokenAsync(string token)
    {
        return await _dbSet.Include(refreshToken => refreshToken.User)
            .FirstOrDefaultAsync(refreshToken => refreshToken.Token == token);
    }
}
