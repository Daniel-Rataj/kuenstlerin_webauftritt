using server.Logic.Interfaces.Base;
using server.Repositories.Base;
using server.Repositories.Interfaces.Base;

namespace server.Logic.Base
{
    public class BaseLogic<T> : IBaseLogic<T> where T : class
    {
        protected readonly IBaseRepository<T> _repository;

        public BaseLogic(IBaseRepository<T> repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<T>> GetAllAsync() => _repository.GetAllAsync();

        public Task<T?> GetByIdAsync(int id) => _repository.GetByIdAsync(id);

        public Task<T> CreateAsync(T entity) => _repository.CreateAsync(entity);

        public Task<T> UpdateAsync(T entity) => _repository.UpdateAsync(entity);

        public Task<bool> DeleteAsync(int id) => _repository.DeleteAsync(id);
    }
}