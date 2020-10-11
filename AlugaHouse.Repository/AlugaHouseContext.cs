using AlugaHouse.Domain;
using Microsoft.EntityFrameworkCore;

namespace AlugaHouse.Repository
{
    public class AlugaHouseContext : DbContext
    {
        public AlugaHouseContext(DbContextOptions<AlugaHouseContext> options) : base(options){ }

        public DbSet<Residence> Residences {get; set; }
        public DbSet<ResidenceType> ResidenceTypes {get; set; }
    }
}