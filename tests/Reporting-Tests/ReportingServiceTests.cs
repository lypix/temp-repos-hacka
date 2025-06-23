using Microsoft.EntityFrameworkCore;
using ReportingApp.Services;
using Xunit;

namespace ReportingTests;

public class ReportingServiceTests
{
    private ReportingDbContext GetInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<ReportingDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        return new ReportingDbContext(options);
    }
    
    [Fact]
    public async Task GetDashboardStatsAsync_WithData_ReturnsCorrectStats()
    {
        // Arrange
        using var context = GetInMemoryContext();
        var service = new ReportingService(context);
        
        // Add test data
        context.Surveys.AddRange(
            new SurveyData { Id = 1, IsCompleted = true, NPSScore = 8 },
            new SurveyData { Id = 2, IsCompleted = true, NPSScore = 9 },
            new SurveyData { Id = 3, IsCompleted = false }
        );
        
        context.NPSResponses.AddRange(
            new NPSResponseData { Id = 1, SurveyId = 1, Score = 8, SentimentLabel = "Zufrieden" },
            new NPSResponseData { Id = 2, SurveyId = 2, Score = 9, SentimentLabel = "Sehr zufrieden" }
        );
        
        await context.SaveChangesAsync();
        
        // Act
        var result = await service.GetDashboardStatsAsync();
        
        // Assert
        Assert.Equal(3, result.TotalSurveys);
        Assert.Equal(2, result.CompletedSurveys);
        Assert.Equal(8.5, result.AverageNPS);
        Assert.Equal(66.7, result.ResponseRate, 1);
    }
    
    [Fact]
    public async Task GetSentimentDistributionAsync_WithData_ReturnsCorrectDistribution()
    {
        // Arrange
        using var context = GetInMemoryContext();
        var service = new ReportingService(context);
        
        context.NPSResponses.AddRange(
            new NPSResponseData { SentimentLabel = "Sehr zufrieden" },
            new NPSResponseData { SentimentLabel = "Sehr zufrieden" },
            new NPSResponseData { SentimentLabel = "Zufrieden" },
            new NPSResponseData { SentimentLabel = "Neutral" },
            new NPSResponseData { SentimentLabel = "Unzufrieden" }
        );
        
        await context.SaveChangesAsync();
        
        // Act
        var result = await service.GetSentimentDistributionAsync();
        
        // Assert
        Assert.Equal(2, result.SehrZufrieden);
        Assert.Equal(1, result.Zufrieden);
        Assert.Equal(1, result.Neutral);
        Assert.Equal(1, result.Unzufrieden);
        Assert.Equal(0, result.SehrUnzufrieden);
    }
}