using server.Logic.Interfaces.Base;
using server.Models.DataAccess;

namespace server.Logic.Interfaces
{
    public interface IUserLogic : IBaseLogic<User>
    {
        /// <summary>
        /// Asynchronously retrieves an user by its username.
        /// </summary>
        /// <param name="id">The unique identifier of the entity.</param>
        /// <returns>The matching entity, or null if not found.</returns>
        Task<User?> GetByUsernameAsync(string username);

        /// <summary>
        /// Verifies whether a provided password matches the given hash using the specified salt.
        /// </summary>
        /// <param name="password">The plaintext password to verify.</param>
        /// <param name="hash">The stored password hash to compare against.</param>
        /// <param name="salt">The salt that was used when the password was originally hashed.</param>
        /// <returns>
        /// True if the password matches the hash when combined with the salt; otherwise, false.
        /// </returns>
        bool VerifyPassword(string password, byte[] hash, byte[] salt);

        /// <summary>
        /// Creates a password hash and a cryptographic salt using HMACSHA512.
        /// </summary>
        /// <param name="password">The plaintext password to hash.</param>
        /// <param name="hash">The resulting hash of the password.</param>
        /// <param name="salt">The cryptographic salt used in hashing, generated randomly.</param>
        void CreatePasswordHash(string password, out byte[] hash, out byte[] salt);
    }

}
