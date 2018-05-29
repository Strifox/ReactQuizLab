using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactLaboration.Models
{
    public class Score
    {
        public int Id { get; set; }
        public int Points { get; set; }

        public User User { get; set; }
        public Quiz Quiz { get; set; }
    }
}
