using Microsoft.AspNetCore.Components.Web;
using server.Helper;
using server.Logic.Base;
using server.Logic.Interfaces;
using server.Repositories.Interfaces;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Logic
{
    public class ArticleAssignmentLogic : BaseLogic<dataAccess.ArticleAssignment, dataTransfer.ArticleAssignment>, IArticleAssignmentLogic
    {
        private readonly IArticleAssignmentRepository _articleassignmentRepository;
        public ArticleAssignmentLogic(IArticleAssignmentRepository repository) : base(repository)
        {
            _articleassignmentRepository = repository;
        }

        public override async Task<dataTransfer.ArticleAssignment> UpdateAsync(int id, dataTransfer.ArticleAssignment dto)
        {
            var existing = await _repository.GetByIdAsync(dto.Id);
            if (existing == null) throw new KeyNotFoundException($"Entity with ID {dto.Id} not found.");

            MapToExistingEntity(dto, existing);
            var updated = await _repository.UpdateAsync(existing);
            return MapToDto(updated);
        }

        protected override dataTransfer.ArticleAssignment MapToDto(dataAccess.ArticleAssignment entity)
        {
            return ArticleAssignmentHelper.ToDto(entity);
        }

        protected override dataAccess.ArticleAssignment MapToEntity(dataTransfer.ArticleAssignment dto)
        {
            return ArticleAssignmentHelper.ToEntity(dto);
        }

        protected override void MapToExistingEntity(dataTransfer.ArticleAssignment dto, dataAccess.ArticleAssignment entity)
        {
            ArticleAssignmentHelper.MapToExistingEntity(dto, entity);
        }
    }
}
