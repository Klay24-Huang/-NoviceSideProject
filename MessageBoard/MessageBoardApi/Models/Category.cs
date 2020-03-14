using System;
using System.Collections.Generic;

namespace MessageBoardApi.Models
{
    public partial class Category
    {
        public Category()
        {
            //Thread = new HashSet<Thread>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        //public virtual ICollection<Thread> Thread { get; set; }
    }
}
