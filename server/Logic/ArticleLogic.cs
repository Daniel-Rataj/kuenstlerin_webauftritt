using server.Helper;
using server.Logic.Base;
using server.Logic.Interfaces;
using server.Models.DataAccess;
using server.Repositories.Interfaces;
using server.Repositories.Interfaces.Base;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Logic
{
    public class ArticleLogic : BaseLogic<dataAccess.Article, dataTransfer.Article>, IArticleLogic
    {
        private readonly IArticleRepository _articleRepository;

        public ArticleLogic(IArticleRepository repository) : base(repository)
        {
            _articleRepository = repository;
        }

        protected override dataTransfer.Article MapToDto(dataAccess.Article entity)
        {
            return ArticleHelper.ToDto(entity);
        }

        protected override dataAccess.Article MapToEntity(dataTransfer.Article dto)
        {
            return ArticleHelper.ToEntity(dto);
        }

        protected override void MapToExistingEntity(dataTransfer.Article dto, dataAccess.Article entity)
        {
            ArticleHelper.MapToExistingEntity(dto, entity);
        }
    }
}
