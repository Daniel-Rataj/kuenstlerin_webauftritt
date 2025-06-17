using server.Controllers.Base;
using server.Logic.Interfaces;
using server.Logic.Interfaces.Base;
using server.Models.DataTransfer;

namespace server.Controllers
{
    public class ExhibitionElementController : CrudBaseController<server.Models.DataTransfer.ExhibitionElement>
    {
        private readonly IExhibitionElementLogic _logic;


        public ExhibitionElementController(IExhibitionElementLogic logic) : base(logic)
        {
            _logic = logic;
        }
    }
}
