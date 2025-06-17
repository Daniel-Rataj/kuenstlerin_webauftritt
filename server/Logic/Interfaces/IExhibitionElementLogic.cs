using Microsoft.AspNetCore.Components.Web;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;
using server.Logic.Interfaces.Base;

namespace server.Logic.Interfaces
{
    public interface IExhibitionElementLogic : IBaseLogic<dataTransfer.ExhibitionElement>
    {
    }
}

