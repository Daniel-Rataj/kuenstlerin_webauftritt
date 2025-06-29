using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using server.Controllers.Base;
using server.Logic.Interfaces;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleAssignmentController : CrudBaseController<dataTransfer.ArticleAssignment>
    {
        private readonly IArticleAssignmentLogic _logic;

        public ArticleAssignmentController(IArticleAssignmentLogic logic) : base(logic)
        {
            _logic = logic;
        }
    }
}
