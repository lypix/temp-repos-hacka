using System.ComponentModel.DataAnnotations;

namespace SurveyApp.Database.Entities;

public class NPSResponse
{
    public int Id { get; set; }
    
    public int SurveyId { get; set; }
    
    public Survey Survey { get; set; } = null!;
    
    [Range(0, 10)]
    public int Score { get; set; }
    
    public string Question1 { get; set; } = string.Empty;
    
    public string Answer1 { get; set; } = string.Empty;
    
    public string Question2 { get; set; } = string.Empty;
    
    public string Answer2 { get; set; } = string.Empty;
    
    public string Question3 { get; set; } = string.Empty;
    
    public string Answer3 { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public string? SentimentLabel { get; set; }
    
    public double? SentimentConfidence { get; set; }
    
    public string? SentimentDetails { get; set; }
}