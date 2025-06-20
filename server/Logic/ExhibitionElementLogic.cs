using Microsoft.AspNetCore.Components.Web;
using server.Helper;
using server.Logic.Base;
using server.Logic.Interfaces;
using server.Models.DataAccess;
using server.Repositories.Interfaces.Base;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Logic
{
    public class ExhibitionElementLogic : BaseLogic<dataAccess.ExhibitionElement, dataTransfer.ExhibitionElement>, IExhibitionElementLogic
    {
        public ExhibitionElementLogic(IBaseRepository<ExhibitionElement> repository) : base(repository)
        {
        }

        protected override dataTransfer.ExhibitionElement MapToDto(dataAccess.ExhibitionElement entity)
        {
            return ExhibitionElementHelper.ToDto(entity);
        }

        protected override dataAccess.ExhibitionElement MapToEntity(dataTransfer.ExhibitionElement dto)
        {
            return ExhibitionElementHelper.ToEntity(dto);
        }
    }
}
