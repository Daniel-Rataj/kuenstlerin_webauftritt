using Microsoft.EntityFrameworkCore;
using dataAccess = server.Models.DataAccess;

namespace server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<dataAccess.User> Users { get; set; }

        // Weitere DbSets hier, z. B.:
        // public DbSet<Post> Posts { get; set; }
    }
}
