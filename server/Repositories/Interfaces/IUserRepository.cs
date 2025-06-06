using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.DataAccess;
using server.Repositories.Base;
using server.Repositories.Interfaces.Base;
using dataAccess = server.Models.DataAccess;


public interface IUserRepository : IBaseRepository<dataAccess.User>
{
    Task<dataAccess.User?> GetByUsernameAsync(string username);
}

