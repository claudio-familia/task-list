using TaskList.Core.Models;

namespace TaskList.Core
{
    public class Todo: BaseEntity
    {
        public Todo(string title)
        {
            this.Title = title;
        }

        public Todo(string title, string description)
        {
            this.Title = title;
            this.Description = description;
        }

        public required string Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}
