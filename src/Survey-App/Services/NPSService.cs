using Microsoft.EntityFrameworkCore;
using SurveyApp.Database;
using SurveyApp.Database.Entities;

namespace SurveyApp.Services;

public class NPSService : INPSService
{
    private readonly SurveyDbContext _context;
    private readonly ISentimentAnalysisService _sentimentService;
    
    public NPSService(SurveyDbContext context, ISentimentAnalysisService sentimentService)
    {
        _context = context;
        _sentimentService = sentimentService;
    }
    
    public async Task<Survey?> GetSurveyByTokenAsync(string token)
    {
        return await _context.Surveys
            .FirstOrDefaultAsync(s => s.SurveyToken == token && !s.IsCompleted);
    }
    
    public async Task<bool> SubmitNPSResponseAsync(string token, int score, List<(string question, string answer)> responses)
    {
        var survey = await GetSurveyByTokenAsync(token);
        if (survey == null) return false;
        
        var npsResponse = new NPSResponse
        {
            SurveyId = survey.Id,
            Score = score,
            Question1 = responses.Count > 0 ? responses[0].question : "",
            Answer1 = responses.Count > 0 ? responses[0].answer : "",
            Question2 = responses.Count > 1 ? responses[1].question : "",
            Answer2 = responses.Count > 1 ? responses[1].answer : "",
            Question3 = responses.Count > 2 ? responses[2].question : "",
            Answer3 = responses.Count > 2 ? responses[2].answer : ""
        };
        
        // Perform sentiment analysis
        var allAnswers = string.Join(" ", responses.Select(r => r.answer));
        if (!string.IsNullOrEmpty(allAnswers))
        {
            var sentiment = await _sentimentService.AnalyzeSentimentAsync(allAnswers);
            npsResponse.SentimentLabel = sentiment.Label;
            npsResponse.SentimentConfidence = sentiment.Confidence;
            npsResponse.SentimentDetails = sentiment.Details;
        }
        
        _context.NPSResponses.Add(npsResponse);
        
        survey.IsCompleted = true;
        survey.CompletedAt = DateTime.UtcNow;
        survey.NPSScore = score;
        
        await _context.SaveChangesAsync();
        return true;
    }
    
    public async Task<List<Survey>> GetRecentSurveysAsync(int count = 10)
    {
        return await _context.Surveys
            .Where(s => s.IsCompleted)
            .OrderByDescending(s => s.CompletedAt)
            .Take(count)
            .ToListAsync();
    }
    
    public async Task<Dictionary<string, object>> GetDashboardStatsAsync()
    {
        var totalSurveys = await _context.Surveys.CountAsync();
        var completedSurveys = await _context.Surveys.CountAsync(s => s.IsCompleted);
        var averageNPS = await _context.NPSResponses.AverageAsync(r => (double?)r.Score) ?? 0;
        var responseRate = totalSurveys > 0 ? (double)completedSurveys / totalSurveys * 100 : 0;
        
        var monthlyTrend = await _context.NPSResponses
            .Where(r => r.CreatedAt >= DateTime.UtcNow.AddMonths(-12))
            .GroupBy(r => new { r.CreatedAt.Year, r.CreatedAt.Month })
            .Select(g => new { 
                Month = $"{g.Key.Year}-{g.Key.Month:D2}", 
                AverageScore = g.Average(r => r.Score),
                Count = g.Count()
            })
            .OrderBy(x => x.Month)
            .ToListAsync();
        
        return new Dictionary<string, object>
        {
            ["TotalSurveys"] = totalSurveys,
            ["CompletedSurveys"] = completedSurveys,
            ["AverageNPS"] = Math.Round(averageNPS, 1),
            ["ResponseRate"] = Math.Round(responseRate, 1),
            ["MonthlyTrend"] = monthlyTrend
        };
    }
}