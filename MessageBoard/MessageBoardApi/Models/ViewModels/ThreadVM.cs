using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MessageBoardApi.Models.ViewModels
{
    public class ThreadVM
    {
        public int ThreadId { get; set; }
        public int CategoryId { get; set; }

        public string ContentText { get; set; }
        public string UserName { get; set; }
        public DateTime ContentTime { get; set; }
        public string PicUrl { get; set; }
    }
}
