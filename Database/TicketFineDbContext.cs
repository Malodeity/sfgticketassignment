using Microsoft.EntityFrameworkCore;
using sfgticketassignment.Models;

namespace sfgticketassignment.Database;

public class TicketFineDbContext : DbContext
{
    public DbSet<AnnualTax> AnnualTax { get; set; }
    public DbSet<Car> Car { get; set; }
    public DbSet<Officer> Officer { get; set; }
    public DbSet<Payment> Payment { get; set; }
    public DbSet<Violation> Violation { get; set; }
    public DbSet<Violator> Violator { get; set; }

    public TicketFineDbContext(DbContextOptions<TicketFineDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AnnualTax>(x => x.HasKey(itm => itm.Id));
        modelBuilder.Entity<Car>(x => x.HasKey(itm => itm.Id));
        modelBuilder.Entity<Officer>(x => x.HasKey(itm => itm.Id));
        modelBuilder.Entity<Payment>(x => x.HasKey(itm => itm.Id));
        modelBuilder.Entity<Violation>(x => x.HasKey(itm => itm.Id));
        modelBuilder.Entity<Violator>(x => x.HasKey(itm => itm.IDNumber));

        // one-to-many
        modelBuilder.Entity<Violation>()
            .HasOne<AnnualTax>(x => x.AnnualTax)
            .WithMany(itm => itm.Violations);

        modelBuilder.Entity<Car>()
            .HasOne<Violator>(x => x.Violator)
            .WithMany(itm => itm.Cars);

        modelBuilder.Entity<Violation>()
            .HasOne<Officer>(x => x.IssueOfficer)
            .WithMany(itm => itm.Violations);

        modelBuilder.Entity<Violation>()
            .HasOne<Car>(x => x.IssuedCar)
            .WithMany(itm => itm.Violations);

        // one-to-one
        modelBuilder.Entity<Car>()
            .HasOne<AnnualTax>(x => x.Tax)
            .WithOne(itm => itm.Car);

        modelBuilder.Entity<Payment>()
            .HasOne<Violation>(x => x.Violation)
            .WithOne(itm => itm.Payment);
    }
}
