namespace SurveyApp.Services;

public interface ISentimentAnalysisService
{
    Task<SentimentResult> AnalyzeSentimentAsync(string text);
}

public class SentimentResult
{
    public string Label { get; set; } = string.Empty;
    public double Confidence { get; set; }
    public string Details { get; set; } = string.Empty;
}