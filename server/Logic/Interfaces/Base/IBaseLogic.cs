using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Logic.Interfaces.Base
{
    /// <summary>
    /// Defines common CRUD operations (Create, Read, Update, Delete) for a generic entity.
    /// </summary>
    /// <typeparam name="T">The type of the entity to operate on. Must be a reference type.</typeparam>
    public interface IBaseLogic<TDto>
    {
        /// <summary>
        /// Asynchronously retrieves all entities of type <typeparamref name="T"/>.
        /// </summary>
        /// <returns>A collection of all entities.</returns>
        Task<IEnumerable<TDto>> GetAllAsync();

        /// <summary>
        /// Asynchronously retrieves a single entity by its ID.
        /// </summary>
        /// <param name="id">The unique identifier of the entity.</param>
        /// <returns>The matching entity, or null if not found.</returns>
        Task<TDto?> GetByIdAsync(int id);

        /// <summary>
        /// Asynchronously creates a new entity of type <typeparamref name="T"/>.
        /// </summary>
        /// <param name="entity">The entity to create.</param>
        /// <returns>The created entity.</returns>
        Task<TDto> CreateAsync(TDto entity);

        /// <summary>
        /// Asynchronously updates an existing entity of type <typeparamref name="T"/>.
        /// </summary>
        /// <param name="entity">The entity to update.</param>
        /// <returns>The updated entity.</returns>
        Task<TDto> UpdateAsync(int id, TDto entity);

        /// <summary>
        /// Asynchronously deletes an entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the entity to delete.</param>
        /// <returns>True if the entity was successfully deleted; otherwise, false.</returns>
        Task<bool> DeleteAsync(int id);
    }
}
