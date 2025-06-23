using Microsoft.EntityFrameworkCore;
using SurveyApp.Database;
using SurveyApp.Database.Entities;
using SurveyApp.Services;
using Moq;
using Xunit;

namespace SurveyTests;

public class NPSServiceTests
{
    private SurveyDbContext GetInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<SurveyDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        return new SurveyDbContext(options);
    }
    
    [Fact]
    public async Task GetSurveyByTokenAsync_ValidToken_ReturnsSurvey()
    {
        // Arrange
        using var context = GetInMemoryContext();
        var mockSentimentService = new Mock<ISentimentAnalysisService>();
        var service = new NPSService(context, mockSentimentService.Object);
        
        var survey = new Survey
        {
            SurveyToken = "test-token-123",
            TicketId = "JIRA-1234",
            TicketTitle = "Test Ticket",
            AssigneeEmail = "test@example.com",
            IsCompleted = false
        };
        
        context.Surveys.Add(survey);
        await context.SaveChangesAsync();
        
        // Act
        var result = await service.GetSurveyByTokenAsync("test-token-123");
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal("JIRA-1234", result.TicketId);
        Assert.False(result.IsCompleted);
    }
    
    [Fact]
    public async Task GetSurveyByTokenAsync_InvalidToken_ReturnsNull()
    {
        // Arrange
        using var context = GetInMemoryContext();
        var mockSentimentService = new Mock<ISentimentAnalysisService>();
        var service = new NPSService(context, mockSentimentService.Object);
        
        // Act
        var result = await service.GetSurveyByTokenAsync("invalid-token");
        
        // Assert
        Assert.Null(result);
    }
    
    [Fact]
    public async Task SubmitNPSResponseAsync_ValidData_ReturnsTrue()
    {
        // Arrange
        using var context = GetInMemoryContext();
        var mockSentimentService = new Mock<ISentimentAnalysisService>();
        
        mockSentimentService.Setup(x => x.AnalyzeSentimentAsync(It.IsAny<string>()))
            .ReturnsAsync(new SentimentResult 
            { 
                Label = "Zufrieden", 
                Confidence = 0.85, 
                Details = "Test sentiment" 
            });
        
        var service = new NPSService(context, mockSentimentService.Object);
        
        var survey = new Survey
        {
            SurveyToken = "test-token-123",
            TicketId = "JIRA-1234",
            TicketTitle = "Test Ticket",
            AssigneeEmail = "test@example.com",
            IsCompleted = false
        };
        
        context.Surveys.Add(survey);
        await context.SaveChangesAsync();
        
        var responses = new List<(string question, string answer)>
        {
            ("Question 1", "Answer 1"),
            ("Question 2", "Answer 2"),
            ("Question 3", "Answer 3")
        };
        
        // Act
        var result = await service.SubmitNPSResponseAsync("test-token-123", 8, responses);
        
        // Assert
        Assert.True(result);
        
        var updatedSurvey = await context.Surveys.FirstAsync(s => s.SurveyToken == "test-token-123");
        Assert.True(updatedSurvey.IsCompleted);
        Assert.Equal(8, updatedSurvey.NPSScore);
        
        var npsResponse = await context.NPSResponses.FirstAsync(r => r.SurveyId == survey.Id);
        Assert.Equal(8, npsResponse.Score);
        Assert.Equal("Answer 1", npsResponse.Answer1);
        Assert.Equal("Zufrieden", npsResponse.SentimentLabel);
    }
}