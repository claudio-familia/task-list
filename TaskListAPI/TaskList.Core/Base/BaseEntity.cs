using System.ComponentModel.DataAnnotations;
using TaskList.Core.Contracts;

namespace TaskList.Core.Models
{
    public class BaseEntity : IAudityEntity
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime ?DeletedAt { get; set; }
    }
}
