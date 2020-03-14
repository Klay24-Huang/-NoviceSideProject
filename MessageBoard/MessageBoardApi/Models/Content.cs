using System;
using System.Collections.Generic;

namespace MessageBoardApi.Models
{
    public partial class Content
    {
        public int ContentId { get; set; }
        public string ContentText { get; set; }
        public string UserName { get; set; }
        public DateTime ContentTime { get; set; }
        public string PicUrl { get; set; }
        public int ThreadId { get; set; }

        //public virtual Thread Thread { get; set; }
    }
}
