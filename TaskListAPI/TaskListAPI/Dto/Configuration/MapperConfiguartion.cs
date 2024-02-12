using AutoMapper;
using TaskList.Core;

namespace TaskListAPI.Dto.Configuration
{
    public class MapperConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            return new MapperConfiguration(config =>
            {
                config.CreateMap<Todo, TodoDto>().ReverseMap();
            });
        }
    }
}
