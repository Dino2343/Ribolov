﻿using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class EdunovaContext : DbContext
    {

        public EdunovaContext(DbContextOptions<EdunovaContext> options) : base(options)
        {
          

        }

        public DbSet<Riba> Ribe { get; set; } 





    }
}
