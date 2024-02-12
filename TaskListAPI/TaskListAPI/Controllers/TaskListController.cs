using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto;
using TaskList.Core;
using TaskList.DataAccess.Repositories.Contracts;
using TaskListAPI.Dto;

namespace TaskListAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskListController(
        IBaseRepository<Todo> baseRepository,
        IMapper mapper
    ) : ControllerBase
    {
        private readonly IBaseRepository<Todo> _baseRepository = baseRepository;
        private readonly IMapper mapper = mapper;

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(mapper.Map<IEnumerable<TodoDto>>(_baseRepository.GetAll()));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var response = _baseRepository.GetById(id);

            if (response == null) return NotFound();

            return Ok(mapper.Map<TodoDto>(response));
        }

        [HttpPost]
        public IActionResult Post(TodoDto entity)
        {
            var response = _baseRepository.Add(mapper.Map<Todo>(entity));

            return Ok(mapper.Map<TodoDto>(response));
        }

        [HttpPut]
        public IActionResult Put(TodoDto entity)
        {
            var response = _baseRepository.Update(mapper.Map<Todo>(entity));

            return Ok(mapper.Map<TodoDto>(response));
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            var entity = _baseRepository.GetById(id);

            if (entity == null) return NotFound();

            var response = _baseRepository.Delete(entity);

            return Ok(mapper.Map<TodoDto>(response));
        }
    }
}
