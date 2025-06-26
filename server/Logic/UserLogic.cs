using server.Logic.Interfaces;
using server.Logic.Base;
using dataTransfer = server.Models.DataTransfer;
using dataAccess = server.Models.DataAccess;
using server.Models.DataAccess;
using server.Helpers;

public class UserLogic : IUserLogic
{
    private readonly IUserRepository _userRepository;

    public UserLogic(IUserRepository repository)
    {
        _userRepository = repository;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await this._userRepository.GetByUsernameAsync(username);
    }

    public async Task<IEnumerable<dataTransfer.User>> GetAllAsync()
    {
        var entities = await _userRepository.GetAllAsync();
        var mappedList = entities.Select(e => MapToDto(e));
        return mappedList;
    }

    public async Task<dataTransfer.User?> GetByGuidAsync(Guid id)
    {
        var result = await this._userRepository.GetByGuidAsync(id);
        return result == null ? null : MapToDto(result);
    }

    public async Task<dataTransfer.User> CreateWithGuidAsync(dataTransfer.User dto)
    {
        var entity = MapToEntity(dto);
        var created = await _userRepository.CreateWithGuidAsync(entity);
        return MapToDto(created);
    }

    public async Task<dataTransfer.User> UpdateWithGuidAsync(dataTransfer.User dto)
    {
        var entity = MapToEntity(dto);
        var updated = await _userRepository.UpdateWithGuidAsync(entity);
        return MapToDto(updated);
    }

    public async Task<bool> DeleteWithGuidAsync(Guid id)
    {
        return await _userRepository.DeleteWithGuidAsync(id);
    }

    protected dataAccess.User MapToEntity(dataTransfer.User dto)
    {
        return UserHelper.ToEntity(dto);
    }

    protected dataTransfer.User MapToDto(dataAccess.User entity)
    {
        return UserHelper.ToDto(entity);
    }
}
