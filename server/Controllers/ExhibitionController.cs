using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using server.Controllers.Base;
using server.Logic.Interfaces;
using server.Models.DataTransfer;
using server.Models.Enums;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExhibitionController : CrudBaseController<server.Models.DataTransfer.Exhibition>
    {

        private readonly IExhibitionLogic _logic;

        public ExhibitionController(IExhibitionLogic logic) : base(logic)
        {
            _logic = logic;
        }

        [HttpPost("{id}/elements/bulk")]
        public async Task<ActionResult<dataTransfer.Exhibition>> UploadExhibitionBulkAsync([FromRoute] int id, [FromForm] ExhibitionBulkUpload dto)
        {
            try
            {
                var result = await _logic.UploadBulkAsync(id, dto.Files, dto.ExhibitionElementsJson);
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e.Message });
            }
        }

        [HttpPost("publish/{id}")]
        public async Task<IActionResult> Publish(int id)
        {
            try
            {
                var existing = await _logic.PublishAsync(id);
                if (existing is null) return NotFound();

                existing.Status = ExhibitionStatus.Public;
                var updated = await _logic.UpdateAsync(existing);

                return Ok(updated);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
