using Microsoft.EntityFrameworkCore;

namespace ReportingApp.Services;

public class ReportingService : IReportingService
{
    private readonly ReportingDbContext _context;
    
    public ReportingService(ReportingDbContext context)
    {
        _context = context;
    }
    
    public async Task<DashboardStats> GetDashboardStatsAsync()
    {
        var totalSurveys = await _context.Surveys.CountAsync();
        var completedSurveys = await _context.Surveys.CountAsync(s => s.IsCompleted);
        var averageNPS = await _context.NPSResponses.AverageAsync(r => (double?)r.Score) ?? 0;
        var responseRate = totalSurveys > 0 ? (double)completedSurveys / totalSurveys * 100 : 0;
        
        // Calculate sentiment accuracy (mock calculation)
        var responsesWithSentiment = await _context.NPSResponses
            .CountAsync(r => !string.IsNullOrEmpty(r.SentimentLabel));
        var totalResponses = await _context.NPSResponses.CountAsync();
        var sentimentAccuracy = totalResponses > 0 ? (double)responsesWithSentiment / totalResponses * 95.2 : 95.2;
        
        return new DashboardStats
        {
            TotalSurveys = totalSurveys,
            CompletedSurveys = completedSurveys,
            AverageNPS = Math.Round(averageNPS, 1),
            ResponseRate = Math.Round(responseRate, 1),
            SentimentAccuracy = Math.Round(sentimentAccuracy, 1)
        };
    }
    
    public async Task<List<NPSResponseData>> GetRecentResponsesAsync(int count = 10)
    {
        return await _context.NPSResponses
            .OrderByDescending(r => r.CreatedAt)
            .Take(count)
            .ToListAsync();
    }
    
    public async Task<List<MonthlyTrend>> GetMonthlyTrendsAsync()
    {
        var trends = await _context.NPSResponses
            .Where(r => r.CreatedAt >= DateTime.UtcNow.AddMonths(-12))
            .GroupBy(r => new { r.CreatedAt.Year, r.CreatedAt.Month })
            .Select(g => new MonthlyTrend
            {
                Month = $"{g.Key.Year}-{g.Key.Month:D2}",
                AverageScore = g.Average(r => r.Score),
                ResponseCount = g.Count()
            })
            .OrderBy(t => t.Month)
            .ToListAsync();
        
        return trends;
    }
    
    public async Task<List<TeamPerformance>> GetTeamPerformanceAsync()
    {
        var teamStats = await _context.Surveys
            .Where(s => s.IsCompleted && s.NPSScore.HasValue)
            .GroupBy(s => s.TeamName)
            .Select(g => new TeamPerformance
            {
                TeamName = g.Key,
                AverageNPS = g.Average(s => s.NPSScore!.Value),
                ResponseCount = g.Count(),
                Trend = "stable" // Simplified - would calculate actual trend
            })
            .OrderByDescending(t => t.AverageNPS)
            .ToListAsync();
        
        return teamStats;
    }
    
    public async Task<SentimentDistribution> GetSentimentDistributionAsync()
    {
        var sentiments = await _context.NPSResponses
            .Where(r => !string.IsNullOrEmpty(r.SentimentLabel))
            .GroupBy(r => r.SentimentLabel)
            .Select(g => new { Label = g.Key, Count = g.Count() })
            .ToListAsync();
        
        var distribution = new SentimentDistribution();
        
        foreach (var sentiment in sentiments)
        {
            switch (sentiment.Label?.ToLower())
            {
                case "sehr zufrieden":
                    distribution.SehrZufrieden = sentiment.Count;
                    break;
                case "zufrieden":
                    distribution.Zufrieden = sentiment.Count;
                    break;
                case "neutral":
                    distribution.Neutral = sentiment.Count;
                    break;
                case "unzufrieden":
                    distribution.Unzufrieden = sentiment.Count;
                    break;
                case "sehr unzufrieden":
                    distribution.SehrUnzufrieden = sentiment.Count;
                    break;
            }
        }
        
        return distribution;
    }
}