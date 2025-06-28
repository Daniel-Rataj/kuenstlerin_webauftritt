using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using server.Controllers.Base;
using server.Logic.Interfaces;
using server.Models.DataTransfer;
using server.Models.Enums;
using server.Models.Requests;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExhibitionController : CrudBaseController<dataTransfer.Exhibition>
    {

        private readonly IExhibitionLogic _logic;

        public ExhibitionController(IExhibitionLogic logic) : base(logic)
        {
            _logic = logic;
        }

        [HttpPost("{id}/elements/bulk")]
        public async Task<ActionResult<IEnumerable<dataTransfer.Exhibition>>> UploadExhibitionBulkAsync([FromRoute] int id, [FromForm] ExhibitionBulkUpload dto)
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

        [HttpPut("{id}/elements/update")]
        public async Task<IActionResult> UpdateExhibitionElementsBulk([FromRoute] int id, [FromBody] List<UpdateExhibitionElementRequest> updatedElements)
        {
            try
            {
                var success = await _logic.UpdateExhibitionElementsBulkAsync(id, updatedElements);
                if (!success) return BadRequest("Failed to update one or more exhibition elements.");
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet("getAllPublished")]
        public async Task<ActionResult<IEnumerable<dataTransfer.Exhibition>>> GetAllPublishedAsync()
        {
            try
            {
                var result = await _logic.GetAllPublishedAsync();
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = e.Message });
            }
        }

        [HttpPost("{id}/elements/delete")]
        public async Task<ActionResult<bool>> DeleteExhibitionElementsBulk([FromRoute] int id, [FromBody] List<int> deletedElementIds)
        {
            try
            {
                var success = await _logic.DeleteExhibitionElementsBulkAsync(id, deletedElementIds);
                return Ok(success); // returns true if successful
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
                return Ok(existing);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
