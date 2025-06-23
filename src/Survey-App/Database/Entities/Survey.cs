using System.ComponentModel.DataAnnotations;

namespace SurveyApp.Database.Entities;

public class Survey
{
    public int Id { get; set; }
    
    [Required]
    public string SurveyToken { get; set; } = string.Empty;
    
    [Required]
    public string TicketId { get; set; } = string.Empty;
    
    [Required]
    public string TicketTitle { get; set; } = string.Empty;
    
    public string TicketDescription { get; set; } = string.Empty;
    
    [Required]
    public string AssigneeEmail { get; set; } = string.Empty;
    
    public string AssigneeName { get; set; } = string.Empty;
    
    public DateTime CompletedDate { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? CompletedAt { get; set; }
    
    public bool IsCompleted { get; set; }
    
    public int? NPSScore { get; set; }
    
    public string? GeneratedQuestions { get; set; }
    
    public string? Answers { get; set; }
    
    public string? SentimentAnalysis { get; set; }
    
    public string TeamName { get; set; } = string.Empty;
}