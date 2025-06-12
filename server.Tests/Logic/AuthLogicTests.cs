using Microsoft.Extensions.Configuration;
using Moq;
using server.Logic.Interfaces;
using server.Models.DataAccess;
using server.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.Tests.Logic
{
    public class AuthLogicTests
    {
        private readonly Mock<IRefreshTokenRepository> _refreshRepoMock = new();
        private readonly Mock<IUserRepository> _userRepoMock = new();
        private readonly Mock<IUserLogic> _userLogicMock = new();

        // Mock Key Settings
        private static Dictionary<string, string?> jwtSettings = new Dictionary<string, string?> {
                {
                    "Jwt:Key",
                    "this_is_a_super_secure_testing_key_that_is_long_enough_1234567890!!"
                } // Dummy key für Token
        };
        private readonly IConfiguration _config = new ConfigurationBuilder().AddInMemoryCollection(jwtSettings).Build();

        private AuthLogic CreateSut() =>
            new AuthLogic(_userLogicMock.Object, _config, _refreshRepoMock.Object);

        [Fact]
        public async Task RefreshTokenAsync_ShouldReturnNull_WhenTokenNotFound()
        {
            _refreshRepoMock.Setup(r => r.GetByTokenAsync(It.IsAny<string>()))
                            .ReturnsAsync((RefreshToken?)null);

            var result = await CreateSut().RefreshTokenAsync("invalid-token");

            Assert.Null(result);
        }

        [Fact]
        public async Task RefreshTokenAsync_ShouldReturnValidResponse_WhenTokenIsValid()
        {
            var user = new server.Models.DataAccess.User
            {
                Id = Guid.NewGuid(),
                Username = "testuser",
                Role = UserRole.Admin
            };

            var refreshToken = new RefreshToken
            {
                Token = "valid-token",
                ExpiresAt = DateTime.UtcNow.AddMinutes(10),
                User = user,
                UserId = user.Id,
                IsRevoked = false
            };

            _refreshRepoMock.Setup(r => r.GetByTokenAsync("valid-token"))
                            .ReturnsAsync(refreshToken);

            _refreshRepoMock.Setup(r => r.UpdateAsync(It.IsAny<RefreshToken>()))
                            .ReturnsAsync(refreshToken);

            _refreshRepoMock.Setup(r => r.CreateAsync(It.IsAny<RefreshToken>()))
                            .ReturnsAsync(new RefreshToken());

            var result = await CreateSut().RefreshTokenAsync("valid-token");

            Assert.NotNull(result);
            Assert.Equal(user.Id, result!.User.Id);
            Assert.False(string.IsNullOrWhiteSpace(result.Token));
        }
    }
}
