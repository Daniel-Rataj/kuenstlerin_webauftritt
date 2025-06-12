using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Controllers.Base;
using server.Logic.Interfaces;
using server.Models.DataTransfer;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : CrudBaseController<User>
    {
        public UserController(IUserLogic logic) : base(logic) {}
    }
}
