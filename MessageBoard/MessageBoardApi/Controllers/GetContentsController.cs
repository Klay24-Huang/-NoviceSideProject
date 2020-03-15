using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessageBoardApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MessageBoardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetContentsController : ControllerBase
    {
        private readonly MessageBoardContext _context;

        public GetContentsController(MessageBoardContext context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public async Task<IEnumerable<Content>> Get(int id)
        {
            var content = from c in _context.Content
                          join t in _context.Thread
                          on c.ThreadId equals t.ThreadId
                          where t.CategoryId == id
                          orderby c.ContentTime
                          select c;
            return content;
        }

        //[HttpGet("{id}")]
        //public async Task<IEnumerable<List<Content>>> Get(int id)
        //{
        //    //List<Content> singleThread = new List<Content>();
        //    var allThread = new List<List<Content>>();
        //    var threads = _context.Thread.Where(x => x.CategoryId==id).ToList();
        //    foreach (var item in threads)
        //    {
        //        var singleThread = _context.Content.Where(x => x.ThreadId == item.ThreadId).ToList();
        //        allThread.Add(singleThread);
        //    }
        //    return allThread;
        //}

    }
}