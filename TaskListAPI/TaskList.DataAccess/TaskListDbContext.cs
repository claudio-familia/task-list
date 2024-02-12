using Microsoft.EntityFrameworkCore;
using TaskList.Core.Contracts;
using TaskList.Core;

namespace TaskList.DataAccess
{
    public class TaskListDbContext : DbContext
    {
        public TaskListDbContext(DbContextOptions<TaskListDbContext> options) : base(options)
        {
        }

        public DbSet<Todo> Todos { get; set; }

        public override int SaveChanges()
        {
            var auditableEntitySet = ChangeTracker.Entries<IAudityEntity>();

            if (auditableEntitySet != null)
            {
                foreach (var auditableEntity in auditableEntitySet.Where(c => c.State == EntityState.Added || c.State == EntityState.Modified))
                {
                    if (auditableEntity.State == EntityState.Added)
                    {
                        auditableEntity.Entity.CreatedAt = DateTime.Now;
                    }

                    if (auditableEntity.Entity.IsDeleted && auditableEntity.State == EntityState.Modified)
                    {
                        auditableEntity.Entity.DeletedAt = DateTime.Now;
                    }
                }
            }

            return base.SaveChanges();
        }
    }
}
