using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactLaboration.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public string Title { get; set; }


        public IList<Question> Questions { get; set; }
        public IList<Score> Scores { get; set; }
    }
}
