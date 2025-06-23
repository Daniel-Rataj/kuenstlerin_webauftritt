using server.Models.DataAccess;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Repositories.Interfaces.Base
{
    /// <summary>
    /// Defines generic data access operations for a specific entity type.
    /// </summary>
    /// <typeparam name="T">The type of the entity. Must be a reference type.</typeparam>
    public interface IBaseRepository<T> where T : class
    {
        /// <summary>
        /// Asynchronously retrieves all entities of type <typeparamref name="T"/>.
        /// </summary>
        /// <returns>A collection of all entities.</returns>
        Task<IEnumerable<T>> GetAllAsync();

        /// <summary>
        /// Asynchronously retrieves a single entity by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the entity.</param>
        /// <returns>The entity if found; otherwise, null.</returns>
        Task<T?> GetByIdAsync(int id);

        /// <summary>
        /// Asynchronously creates a new entity in the data store.
        /// </summary>
        /// <param name="entity">The entity to be created.</param>
        /// <returns>The created entity.</returns>
        Task<T> CreateAsync(T entity);

        /// <summary>
        /// Asynchronously updates an existing entity in the data store.
        /// </summary>
        /// <param name="entity">The entity with updated values.</param>
        /// <returns>The updated entity.</returns>
        Task<T> UpdateAsync(T entity);

        /// <summary>
        /// Asynchronously deletes an entity by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the entity to delete.</param>
        /// <returns>True if the entity was successfully deleted; otherwise, false.</returns>
        Task<bool> DeleteAsync(int id);
    }
}