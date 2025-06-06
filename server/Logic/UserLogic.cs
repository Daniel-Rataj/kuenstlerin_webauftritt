using server.Logic.Interfaces;
using server.Repositories;
using System.Security.Cryptography;
using System.Text;
using server.Logic.Base;
using dataTransfer = server.Models.DataTransfer;
using dataAccess = server.Models.DataAccess;
using server.Models.DataAccess;
using server.Helpers;

public class UserLogic : BaseLogic<dataAccess.User, dataTransfer.User>, IUserLogic
{
    private readonly IUserRepository _userRepository;

    public UserLogic(IUserRepository repository) : base(repository)
    {
        _userRepository = repository;
    }

    protected override dataAccess.User MapToEntity(dataTransfer.User dto)
    {
        return UserHelper.ToEntity(dto);
    }

    protected override dataTransfer.User MapToDto(dataAccess.User entity)
    {
        return UserHelper.ToDto(entity);
    }

    public Task<User?> GetByUsernameAsync(string username)
    {
        return this._userRepository.GetByUsernameAsync(username);
    }
}
