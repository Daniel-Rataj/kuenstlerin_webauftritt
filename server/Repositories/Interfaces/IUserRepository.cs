using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.DataAccess;
using server.Repositories.Base;
using server.Repositories.Interfaces.Base;
using dataAccess = server.Models.DataAccess;


public interface IUserRepository
{
    /// <summary>
    /// Asynchronously retrieves a single entity by its username identifier.
    /// </summary>
    /// <param name="username">The unique identifier of the entity.</param>
    /// <returns>The entity if found; otherwise, null.</returns>
    Task<dataAccess.User?> GetByUsernameAsync(string username);
    /// <summary>
    /// Asynchronously retrieves all entities of type <typeparamref name="T"/>.
    /// </summary>
    /// <returns>A collection of all entities.</returns>
    Task<IEnumerable<dataAccess.User>> GetAllAsync();

    /// <summary>
    /// Asynchronously retrieves a single entity by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the entity.</param>
    /// <returns>The entity if found; otherwise, null.</returns>
    Task<dataAccess.User?> GetByGuidAsync(Guid id);

    /// <summary>
    /// Asynchronously creates a new entity in the data store.
    /// </summary>
    /// <param name="entity">The entity to be created.</param>
    /// <returns>The created entity.</returns>
    Task<dataAccess.User> CreateWithGuidAsync(dataAccess.User entity);

    /// <summary>
    /// Asynchronously updates an existing entity in the data store.
    /// </summary>
    /// <param name="entity">The entity with updated values.</param>
    /// <returns>The updated entity.</returns>
    Task<dataAccess.User> UpdateWithGuidAsync(dataAccess.User entity);

    /// <summary>
    /// Asynchronously deletes an entity by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the entity to delete.</param>
    /// <returns>True if the entity was successfully deleted; otherwise, false.</returns>
    Task<bool> DeleteWithGuidAsync(Guid id);
}

