using server.Models.DataTransfer.Responses;

namespace server.Logic.Interfaces
{
    /// <summary>
    /// Defines authentication-related operations.
    /// </summary>
    public interface IAuthLogic
    {
        /// <summary>
        /// Attempts to authenticate a user with the provided username and password.
        /// </summary>
        /// <param name="username">The username of the user attempting to log in.</param>
        /// <param name="password">The plaintext password of the user.</param>
        /// <returns>
        /// A JWT or session token as a string if authentication is successful; otherwise, null.
        /// </returns>
        Task<LoginResponse?> LoginAsync(string username, string password);
    }
}
