using server.Data;
using server.Models.DataAccess;
using server.Repositories.Base;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class ArticleAssignmentRepository : BaseRepository<ArticleAssignment>, IArticleAssignmentRepository
    {
        public ArticleAssignmentRepository(ApplicationDbContext context) : base(context) { }
    }
}
