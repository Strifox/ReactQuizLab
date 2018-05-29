using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using ReactLaboration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactLaboration.Data
{
    public static class SeedData
    {

        public static void Initialize(QuizContext quizContext)
        {
            quizContext.Database.EnsureCreated();

            if (quizContext.Roles.Any())
                return;


            quizContext.Roles.AddRange(
                new IdentityRole
                {
                    Name = "Admin"
                },
                new IdentityRole
                {
                    Name = "Member"
                });

            quizContext.SaveChanges();
        }
    }
}
