using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.DataAccess;
using server.Repositories.Base;
using server.Repositories.Interfaces.Base;

public interface IUserRepository : IBaseRepository<User>
{
    Task<User?> GetByUsernameAsync(string username);
}

