using Microsoft.EntityFrameworkCore;

namespace ReportingApp.Services;

// Simplified context for reporting - reads from existing survey data
public class ReportingDbContext : DbContext
{
    public ReportingDbContext(DbContextOptions<ReportingDbContext> options) : base(options)
    {
    }
    
    public DbSet<SurveyData> Surveys { get; set; }
    public DbSet<NPSResponseData> NPSResponses { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Map to existing tables from Survey-App
        modelBuilder.Entity<SurveyData>().ToTable("Surveys");
        modelBuilder.Entity<NPSResponseData>().ToTable("NPSResponses");
    }
}

public class SurveyData
{
    public int Id { get; set; }
    public string SurveyToken { get; set; } = string.Empty;
    public string TicketId { get; set; } = string.Empty;
    public string TicketTitle { get; set; } = string.Empty;
    public string TicketDescription { get; set; } = string.Empty;
    public string AssigneeEmail { get; set; } = string.Empty;
    public string AssigneeName { get; set; } = string.Empty;
    public DateTime CompletedDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public bool IsCompleted { get; set; }
    public int? NPSScore { get; set; }
    public string TeamName { get; set; } = string.Empty;
}

public class NPSResponseData
{
    public int Id { get; set; }
    public int SurveyId { get; set; }
    public int Score { get; set; }
    public string Question1 { get; set; } = string.Empty;
    public string Answer1 { get; set; } = string.Empty;
    public string Question2 { get; set; } = string.Empty;
    public string Answer2 { get; set; } = string.Empty;
    public string Question3 { get; set; } = string.Empty;
    public string Answer3 { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string? SentimentLabel { get; set; }
    public double? SentimentConfidence { get; set; }
    public string? SentimentDetails { get; set; }
}