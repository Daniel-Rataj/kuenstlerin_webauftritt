using server.Logic.Interfaces.Base;
using dataTransfer = server.Models.DataTransfer;
using dataAccess = server.Models.DataAccess;

namespace server.Logic.Interfaces
{
    public interface IUserLogic : IBaseLogic<dataTransfer.User>
    {
        /// <summary>
        /// Asynchronously retrieves an user by its username.
        /// </summary>
        /// <param name="id">The unique identifier of the entity.</param>
        /// <returns>The matching entity, or null if not found.</returns>
        Task<dataAccess.User?> GetByUsernameAsync(string username);
    }

}
