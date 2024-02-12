using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TaskList.Core;
using TaskList.DataAccess.Repositories;
using TaskList.DataAccess.Repositories.Contracts;

namespace TaskList.DataAccess.Configuration
{
    public static partial class RepositoriesConfiguration
    {
        public static void AddRepositories(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<TaskListDbContext>(options =>
            {
                options.UseMySQL(connectionString);
            });

            services.AddScoped<IBaseRepository<Todo>, BaseRepository<Todo>>();
        }
    }
}
