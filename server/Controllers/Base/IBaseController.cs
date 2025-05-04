using Microsoft.AspNetCore.Mvc;

namespace server.Controller.Base
{
    public interface IBaseController<T> where T : class
    {
        Task<ActionResult<IEnumerable<T>>> GetAll();
        Task<ActionResult<T>> Get(int id);
        Task<ActionResult<T>> Create([FromBody] T entity);
        Task<ActionResult<T>> Update(int id, [FromBody] T entity);
        Task<ActionResult> Delete(int id);
    }

}
