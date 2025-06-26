using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Controllers.Base;
using server.Logic.Interfaces;
using server.Models.DataTransfer;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserLogic _userLogic;
        public UserController(IUserLogic logic)
        {
            _userLogic = logic;
        }

        // Überschreibe GetById, um string id (GUID) zu verwenden
        [HttpGet()]
        public async Task<ActionResult<User>> GetAll()
        {
            try
            {
                var result = await _userLogic.GetAllAsync();
                return result == null ? NotFound() : Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = $"Fehler beim Abrufen aller User: {e.Message}" });
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetById(Guid id)
        {
            try
            {
                var result = await _userLogic.GetByGuidAsync(id);
                return result == null ? NotFound() : Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = $"Fehler beim Abrufen von User mit ID {id}: {e.Message}"});
            }
        }

        [HttpPost]
        public virtual async Task<ActionResult<User>> Create([FromBody] User dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // <-- wichtige Rückmeldung an den Client

            try
            {
                var created = await this._userLogic.CreateWithGuidAsync(dto);
                return Created(string.Empty, created);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = $"Fehler beim Erstellen von User mit Username {dto.Username}: {e.Message}" });
            }

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> Update(Guid id, [FromBody] User dto)
        {
            if (id != dto.Id)
            {
                return BadRequest("ID in URL und Body stimmen nicht überein.");
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState); // <-- wichtige Rückmeldung an den Client

            try
            {
                var updated = await _userLogic.UpdateWithGuidAsync(dto);
                return Ok(updated);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = $"Fehler beim Aktualisieren von User mit ID {id}: { e.Message}" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var success = await _userLogic.DeleteWithGuidAsync(id);
                return success ? NoContent() : NotFound();
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = $"Fehler beim Löschen von User mit ID {id}: {e.Message}" });
            }
        }
    }
}
