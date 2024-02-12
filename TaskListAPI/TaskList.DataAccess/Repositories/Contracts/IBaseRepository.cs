using TaskList.Core.Contracts;

namespace TaskList.DataAccess.Repositories.Contracts
{
    public interface IBaseRepository<T> where T : class, IAudityEntity
    {
        T Add(T entity);
        T Update(T entity);
        T Delete(T entity);
        T? GetById(int id);
        IEnumerable<T> GetAll();
    }
}
