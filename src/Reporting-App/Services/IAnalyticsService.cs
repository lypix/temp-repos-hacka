namespace ReportingApp.Services;

public interface IAnalyticsService
{
    Task<List<CategoryAnalysis>> GetCategoryAnalysisAsync();
    Task<List<InsightData>> GetAIInsightsAsync();
}

public class CategoryAnalysis
{
    public string Category { get; set; } = string.Empty;
    public string Sentiment { get; set; } = string.Empty;
    public double Confidence { get; set; }
    public int Mentions { get; set; }
    public List<string> Keywords { get; set; } = new();
}

public class InsightData
{
    public string Type { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Impact { get; set; } = string.Empty;
}