namespace ReportingApp.Services;

public interface IReportingService
{
    Task<DashboardStats> GetDashboardStatsAsync();
    Task<List<NPSResponseData>> GetRecentResponsesAsync(int count = 10);
    Task<List<MonthlyTrend>> GetMonthlyTrendsAsync();
    Task<List<TeamPerformance>> GetTeamPerformanceAsync();
    Task<SentimentDistribution> GetSentimentDistributionAsync();
}

public class DashboardStats
{
    public int TotalSurveys { get; set; }
    public int CompletedSurveys { get; set; }
    public double AverageNPS { get; set; }
    public double ResponseRate { get; set; }
    public double SentimentAccuracy { get; set; }
}

public class MonthlyTrend
{
    public string Month { get; set; } = string.Empty;
    public double AverageScore { get; set; }
    public int ResponseCount { get; set; }
}

public class TeamPerformance
{
    public string TeamName { get; set; } = string.Empty;
    public double AverageNPS { get; set; }
    public int ResponseCount { get; set; }
    public string Trend { get; set; } = string.Empty;
}

public class SentimentDistribution
{
    public int SehrZufrieden { get; set; }
    public int Zufrieden { get; set; }
    public int Neutral { get; set; }
    public int Unzufrieden { get; set; }
    public int SehrUnzufrieden { get; set; }
}