namespace ReportingApp.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly ReportingDbContext _context;
    
    public AnalyticsService(ReportingDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<CategoryAnalysis>> GetCategoryAnalysisAsync()
    {
        // Mock data for demonstration - in real implementation, this would analyze actual responses
        return new List<CategoryAnalysis>
        {
            new CategoryAnalysis
            {
                Category = "Implementierungsqualität",
                Sentiment = "Positiv",
                Confidence = 0.92,
                Mentions = 234,
                Keywords = new List<string> { "exzellent", "gut umgesetzt", "robust", "sauberer Code" }
            },
            new CategoryAnalysis
            {
                Category = "Kommunikation",
                Sentiment = "Positiv",
                Confidence = 0.88,
                Mentions = 189,
                Keywords = new List<string> { "klar", "responsiv", "hilfreich", "zeitnah" }
            },
            new CategoryAnalysis
            {
                Category = "Performance",
                Sentiment = "Neutral",
                Confidence = 0.85,
                Mentions = 156,
                Keywords = new List<string> { "schnell", "langsam", "Optimierung", "Ladezeit" }
            },
            new CategoryAnalysis
            {
                Category = "Benutzererfahrung",
                Sentiment = "Positiv",
                Confidence = 0.91,
                Mentions = 198,
                Keywords = new List<string> { "intuitiv", "benutzerfreundlich", "einfach", "flüssig" }
            },
            new CategoryAnalysis
            {
                Category = "Dokumentation",
                Sentiment = "Negativ",
                Confidence = 0.79,
                Mentions = 87,
                Keywords = new List<string> { "unklar", "fehlend", "unvollständig", "verwirrend" }
            }
        };
    }
    
    public async Task<List<InsightData>> GetAIInsightsAsync()
    {
        // Mock insights - in real implementation, these would be generated by AI analysis
        return new List<InsightData>
        {
            new InsightData
            {
                Type = "positive",
                Title = "Starkes Implementierungs-Feedback",
                Description = "Kunden loben durchgehend die Codequalität und den Implementierungsansatz",
                Impact = "hoch"
            },
            new InsightData
            {
                Type = "warning",
                Title = "Dokumentations-Bedenken",
                Description = "Mehrfache Erwähnungen von unklarer oder fehlender Dokumentation",
                Impact = "mittel"
            },
            new InsightData
            {
                Type = "info",
                Title = "Performance-Optimierungsmöglichkeit",
                Description = "Gemischtes Feedback zur Performance deutet auf Verbesserungspotential hin",
                Impact = "mittel"
            }
        };
    }
}