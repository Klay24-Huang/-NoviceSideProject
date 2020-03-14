using System;
using System.Collections.Generic;

namespace MessageBoardApi.Models
{
    public partial class Thread
    {
        public Thread()
        {
            //Content = new HashSet<Content>();
        }

        public int ThreadId { get; set; }
        public int CategoryId { get; set; }

        //public virtual Category Category { get; set; }
        //public virtual ICollection<Content> Content { get; set; }
    }
}
