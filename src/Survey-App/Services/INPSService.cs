using SurveyApp.Database.Entities;

namespace SurveyApp.Services;

public interface INPSService
{
    Task<Survey?> GetSurveyByTokenAsync(string token);
    Task<bool> SubmitNPSResponseAsync(string token, int score, List<(string question, string answer)> responses);
    Task<List<Survey>> GetRecentSurveysAsync(int count = 10);
    Task<Dictionary<string, object>> GetDashboardStatsAsync();
}