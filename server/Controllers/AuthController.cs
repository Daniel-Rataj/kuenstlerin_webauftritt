using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using server.Logic.Interfaces;
using server.Models.DataTransfer.Requests;
using server.Models.DataTransfer.Responses;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthLogic _authLogic;

    public AuthController(IAuthLogic authLogic)
    {
        _authLogic = authLogic;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] server.Models.DataTransfer.Requests.LoginRequest request)
    {
        var response = await _authLogic.LoginAsync(request.Username, request.Password);
        if (response == null)
        {
            return Unauthorized("Ungültige Anmeldedaten.");
        }

        return Ok(response); // returns LoginResponse with Token + User (DTO)
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
    {   
        var response = await _authLogic.RefreshTokenAsync(request.RefreshToken);
        if (response == null)
        {
            return Unauthorized("Ungültiger oder abgelaufener Token.");
        }

        return Ok(response);
    }
}
