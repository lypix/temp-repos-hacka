using Microsoft.EntityFrameworkCore;
using SurveyApp.Database.Entities;

namespace SurveyApp.Database;

public class SurveyDbContext : DbContext
{
    public SurveyDbContext(DbContextOptions<SurveyDbContext> options) : base(options)
    {
    }
    
    public DbSet<Survey> Surveys { get; set; }
    public DbSet<NPSResponse> NPSResponses { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Survey>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.SurveyToken).IsUnique();
            entity.Property(e => e.SurveyToken).HasMaxLength(100);
            entity.Property(e => e.TicketId).HasMaxLength(50);
            entity.Property(e => e.TicketTitle).HasMaxLength(500);
            entity.Property(e => e.AssigneeEmail).HasMaxLength(255);
            entity.Property(e => e.AssigneeName).HasMaxLength(255);
            entity.Property(e => e.TeamName).HasMaxLength(100);
        });
        
        modelBuilder.Entity<NPSResponse>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Survey)
                  .WithMany()
                  .HasForeignKey(e => e.SurveyId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.Property(e => e.SentimentLabel).HasMaxLength(50);
        });
    }
}