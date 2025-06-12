using System.Security.Cryptography;
using System.Text;

namespace server.Helper
{
    public static class AuthHelper
    {
        /// <summary>
        /// Creates a password hash and a cryptographic salt using HMACSHA512.
        /// </summary>
        /// <param name="password">The plaintext password to hash.</param>
        /// <param name="hash">The resulting hash of the password.</param>
        /// <param name="salt">The cryptographic salt used in hashing, generated randomly.</param>
        public static void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using var hmac = new HMACSHA512();
            salt = hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        /// <summary>
        /// Verifies whether a provided password matches the given hash using the specified salt.
        /// </summary>
        /// <param name="password">The plaintext password to verify.</param>
        /// <param name="hash">The stored password hash to compare against.</param>
        /// <param name="salt">The salt that was used when the password was originally hashed.</param>
        /// <returns>
        /// True if the password matches the hash when combined with the salt; otherwise, false.
        /// </returns>
        public static bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            using var hmac = new HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            Console.WriteLine("Entered password hash: " + Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password))));
            Console.WriteLine("Stored password hash: " + Convert.ToBase64String(storedHash));
            return computedHash.SequenceEqual(storedHash);
        }
    }
}
