using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactLaboration.Models
{
    public class User : IdentityUser
    {
        public IList<Score> Scores { get; set; }
    }
}
