using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Logic.Interfaces.Base;
using System.Net;

namespace server.Controllers.Base;

[ApiController]
[Route("api/[controller]")]
public abstract class CrudBaseController<T> : ControllerBase where T : class
{
    private readonly IBaseLogic<T> _logic;

    protected CrudBaseController(IBaseLogic<T> logic)
    {
        _logic = logic;
    }

    [HttpGet]
    public virtual async Task<ActionResult<IEnumerable<T>>> GetAll()
    {
        try
        {
            var result = await _logic.GetAllAsync();
            return Ok(result);
        }
        catch (Exception exception)
        {
            return HandleException("Fehler beim Abrufen aller Elemente", exception);
        }
    }

    [HttpGet("{id}")]
    public virtual async Task<ActionResult<T>> GetById(int id)
    {
        try
        {
            var result = await _logic.GetByIdAsync(id);
            return result is null ? NotFound() : Ok(result);
        }
        catch (Exception exception)
        {
            return HandleException($"Fehler beim Abrufen von Element mit ID {id}", exception);
        }
    }

    [HttpPost]
    public virtual async Task<ActionResult<T>> Create([FromBody] T dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState); // <-- wichtige Rückmeldung an den Client

        try
        {
            var created = await this._logic.CreateAsync(dto);
            return Created(string.Empty, created);
        }
        catch (Exception exception)
        {
            return HandleException("Fehler beim Erstellen des Elements", exception);
        }
    }

    [HttpPut("{id}")]
    public virtual async Task<ActionResult<T>> Update(int id, [FromBody] T dto)
    {
        try
        {
            var updated = await _logic.UpdateAsync(id, dto);
            return Ok(updated);
        }
        catch (Exception exception)
        {
            return HandleException($"Fehler beim Aktualisieren von Element mit ID {id}", exception);
        }
    }

    [HttpDelete("{id}")]
    public virtual async Task<IActionResult> Delete(int id)
    {
        try
        {
            var success = await _logic.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
        catch (Exception exception)
        {
            return HandleException($"Fehler beim Löschen von Element mit ID {id}", exception);
        }
    }

    protected ActionResult HandleException(string contextMessage, Exception exception)
    {
        // Logging
        Console.Error.WriteLine($"{contextMessage}: {exception.Message}");

        // specific exception handling
        if (exception is ArgumentException or InvalidOperationException)
        {
            return BadRequest(new { error = exception.Message });
        }

        // Fallback: unexpected server error
        return StatusCode((int)HttpStatusCode.InternalServerError, new { error = "Ein unerwarteter Fehler ist aufgetreten." });
    }
}
