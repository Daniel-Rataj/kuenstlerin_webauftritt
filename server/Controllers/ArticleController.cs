using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using server.Controllers.Base;
using server.Logic.Interfaces;
using server.Logic.Interfaces.Base;
using server.Models.DataTransfer;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : CrudBaseController<dataTransfer.Article>
    {
        private readonly IArticleLogic _logic;

        public ArticleController(IArticleLogic logic) : base(logic)
        {
            _logic = logic;
        }
    }
}
