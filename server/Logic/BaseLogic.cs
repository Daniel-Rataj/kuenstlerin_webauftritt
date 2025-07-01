using server.Logic.Interfaces.Base;
using server.Repositories.Base;
using server.Repositories.Interfaces.Base;

namespace server.Logic.Base
{
    public abstract class BaseLogic<TEntity, TDto> : IBaseLogic<TDto>
    where TEntity : class
    where TDto : class
    {
        protected IBaseRepository<TEntity> _repository;

        protected BaseLogic(IBaseRepository<TEntity> repository)
        {
            _repository = repository;
        }

        public virtual async Task<IEnumerable<TDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Select(MapToDto);
        }

        public virtual async Task<TDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity == null ? null : MapToDto(entity);
        }

        public virtual async Task<TDto> CreateAsync(TDto dto)
        {
            var entity = MapToEntity(dto);
            var created = await _repository.CreateAsync(entity);
            return MapToDto(created);
        }

        public virtual async Task<TDto> UpdateAsync(TDto dto)
        {
            var entity = MapToEntity(dto);
            var updated = await _repository.UpdateAsync(entity);
            return MapToDto(updated);
        }

        public virtual async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        protected abstract TEntity MapToEntity(TDto dto);
        protected abstract TDto MapToDto(TEntity entity);
        protected abstract void MapToExistingEntity(TDto dto, TEntity entity);
    }

}
