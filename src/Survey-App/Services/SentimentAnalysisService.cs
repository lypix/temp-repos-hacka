using Azure.AI.OpenAI;

namespace SurveyApp.Services;

public class SentimentAnalysisService : ISentimentAnalysisService
{
    private readonly OpenAIClient _client;
    private readonly IConfiguration _configuration;
    
    public SentimentAnalysisService(OpenAIClient client, IConfiguration configuration)
    {
        _client = client;
        _configuration = configuration;
    }
    
    public async Task<SentimentResult> AnalyzeSentimentAsync(string text)
    {
        var deploymentName = _configuration["AzureOpenAI:DeploymentName"] ?? "gpt-35-turbo";
        
        var prompt = $@"
Analysiere die Stimmung des folgenden Textes und klassifiziere sie in eine der folgenden Kategorien:
- Sehr zufrieden
- Zufrieden  
- Neutral
- Unzufrieden
- Sehr unzufrieden

Text: ""{text}""

Antworte im folgenden JSON-Format:
{{
    ""label"": ""[Kategorie]"",
    ""confidence"": [0.0-1.0],
    ""details"": ""[Kurze Begründung]""
}}";

        try
        {
            var chatCompletionsOptions = new ChatCompletionsOptions()
            {
                DeploymentName = deploymentName,
                Messages =
                {
                    new ChatRequestSystemMessage("Du bist ein Experte für Sentiment-Analyse. Analysiere Texte präzise und gib strukturierte Antworten."),
                    new ChatRequestUserMessage(prompt)
                },
                MaxTokens = 200,
                Temperature = 0.3f
            };

            var response = await _client.GetChatCompletionsAsync(chatCompletionsOptions);
            var content = response.Value.Choices[0].Message.Content;
            
            // Parse JSON response
            try
            {
                var jsonDoc = System.Text.Json.JsonDocument.Parse(content);
                var root = jsonDoc.RootElement;
                
                return new SentimentResult
                {
                    Label = root.GetProperty("label").GetString() ?? "Neutral",
                    Confidence = root.GetProperty("confidence").GetDouble(),
                    Details = root.GetProperty("details").GetString() ?? ""
                };
            }
            catch
            {
                // Fallback parsing
                return ParseFallbackSentiment(content);
            }
        }
        catch (Exception)
        {
            // Return neutral sentiment if analysis fails
            return new SentimentResult
            {
                Label = "Neutral",
                Confidence = 0.5,
                Details = "Automatische Analyse nicht verfügbar"
            };
        }
    }
    
    private SentimentResult ParseFallbackSentiment(string content)
    {
        var lowerContent = content.ToLower();
        
        if (lowerContent.Contains("sehr zufrieden"))
            return new SentimentResult { Label = "Sehr zufrieden", Confidence = 0.8, Details = "Positive Sprache erkannt" };
        if (lowerContent.Contains("zufrieden"))
            return new SentimentResult { Label = "Zufrieden", Confidence = 0.7, Details = "Positive Tendenz" };
        if (lowerContent.Contains("unzufrieden"))
            return new SentimentResult { Label = "Unzufrieden", Confidence = 0.7, Details = "Negative Tendenz" };
        if (lowerContent.Contains("sehr unzufrieden"))
            return new SentimentResult { Label = "Sehr unzufrieden", Confidence = 0.8, Details = "Negative Sprache erkannt" };
        
        return new SentimentResult { Label = "Neutral", Confidence = 0.6, Details = "Neutrale Bewertung" };
    }
}