using server.Models.DataAccess;
using server.Repositories.Interfaces.Base;

public interface IRefreshTokenRepository : IBaseRepository<RefreshToken>
{
    Task<RefreshToken?> GetByTokenAsync(string token);
}

