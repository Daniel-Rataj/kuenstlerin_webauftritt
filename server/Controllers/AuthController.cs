using Microsoft.AspNetCore.Mvc;
using server.Logic.Interfaces;
using server.Models.DataTransfer.Requests;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthLogic _authLogic;

    public AuthController(IAuthLogic authLogic)
    {
        _authLogic = authLogic;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _authLogic.LoginAsync(request.Username, request.Password);
        return response == null 
            ? Unauthorized("Ungültige Anmeldedaten") 
            : Ok(response); // returns LoginResponse with Token + User (DTO)
    }
}
