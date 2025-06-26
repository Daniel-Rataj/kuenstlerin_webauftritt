using server.Logic.Interfaces.Base;
using dataTransfer = server.Models.DataTransfer;
using dataAccess = server.Models.DataAccess;
using server.Models.DataTransfer;

namespace server.Logic.Interfaces
{
    public interface IUserLogic
    {
        /// <summary>
        /// Asynchronously retrieves an user by its username.
        /// </summary>
        /// <param name="id">The unique identifier of the entity.</param>
        /// <returns>The matching entity, or null if not found.</returns>
        Task<dataAccess.User?> GetByUsernameAsync(string username);

        /// <summary>
        /// Asynchronously retrieves all entities of type <typeparamref name="T"/>.
        /// </summary>
        /// <returns>A collection of all entities.</returns>
        Task<IEnumerable<dataTransfer.User>> GetAllAsync();

        /// <summary>
        /// Asynchronously retrieves a single entity by its ID.
        /// </summary>
        /// <param name="id">The unique identifier of the entity.</param>
        /// <returns>The matching entity, or null if not found.</returns>
        Task<dataTransfer.User?> GetByGuidAsync(Guid id);

        /// <summary>
        /// Asynchronously creates a new entity of type <typeparamref name="T"/>.
        /// </summary>
        /// <param name="entity">The entity to create.</param>
        /// <returns>The created entity.</returns>
        Task<dataTransfer.User> CreateWithGuidAsync(dataTransfer.User dto);

        /// <summary>
        /// Asynchronously updates an existing entity of type <typeparamref name="T"/>.
        /// </summary>
        /// <param name="entity">The entity to update.</param>
        /// <returns>The updated entity.</returns>
        Task<dataTransfer.User> UpdateWithGuidAsync(dataTransfer.User dto);

        /// <summary>
        /// Asynchronously deletes an entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the entity to delete.</param>
        /// <returns>True if the entity was successfully deleted; otherwise, false.</returns>
        Task<bool> DeleteWithGuidAsync(Guid id);
    }

}
