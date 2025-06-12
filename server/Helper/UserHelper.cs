using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

using server.Models.DataAccess;
using server.Models.DataTransfer;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Components.Web;
using server.Helper;

namespace server.Helpers
{
    public static class UserHelper
    {
        public static dataAccess.User ToEntity(dataTransfer.User dto)
        {
            AuthHelper.CreatePasswordHash(dto.Password, out byte[] hash, out byte[] salt);

            return new dataAccess.User
            {
                Id = Guid.NewGuid(),
                Username = dto.Username,
                PasswordHash = hash,
                PasswordSalt = salt,
                Role = dto.Role
            };
        }

        public static dataTransfer.User ToDto(dataAccess.User user)
        {
            return new dataTransfer.User
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role
            };
        }
    }
}

