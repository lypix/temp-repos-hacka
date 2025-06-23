using Azure.AI.OpenAI;
using System.Text.Json;

namespace SurveyApp.Services;

public class OpenAIService : IOpenAIService
{
    private readonly OpenAIClient _client;
    private readonly IConfiguration _configuration;
    
    public OpenAIService(OpenAIClient client, IConfiguration configuration)
    {
        _client = client;
        _configuration = configuration;
    }
    
    public async Task<List<string>> GenerateFollowUpQuestionsAsync(int npsScore, string ticketTitle, string ticketDescription)
    {
        var deploymentName = _configuration["AzureOpenAI:DeploymentName"] ?? "gpt-35-turbo";
        
        var prompt = $@"
Basierend auf einem NPS-Score von {npsScore}/10 für das abgeschlossene Ticket:
Titel: {ticketTitle}
Beschreibung: {ticketDescription}

Generiere genau 3 semantisch passende Folgefragen auf Deutsch, die sich auf die Umsetzung und Stimmung beziehen.
Die Fragen sollen:
- Spezifisch für den NPS-Score angemessen sein
- Sich auf die technische Umsetzung beziehen
- Die Zufriedenheit und Stimmung erfassen
- Als Freitext beantwortet werden können

Antworte nur mit den 3 Fragen, eine pro Zeile, ohne Nummerierung oder zusätzlichen Text.";

        try
        {
            var chatCompletionsOptions = new ChatCompletionsOptions()
            {
                DeploymentName = deploymentName,
                Messages =
                {
                    new ChatRequestSystemMessage("Du bist ein Experte für Kundenfeedback und NPS-Umfragen. Generiere präzise, relevante Folgefragen."),
                    new ChatRequestUserMessage(prompt)
                },
                MaxTokens = 300,
                Temperature = 0.7f
            };

            var response = await _client.GetChatCompletionsAsync(chatCompletionsOptions);
            var content = response.Value.Choices[0].Message.Content;
            
            var questions = content.Split('\n', StringSplitOptions.RemoveEmptyEntries)
                                  .Select(q => q.Trim())
                                  .Where(q => !string.IsNullOrEmpty(q))
                                  .Take(3)
                                  .ToList();
            
            // Fallback questions if AI generation fails
            if (questions.Count < 3)
            {
                questions = GetFallbackQuestions(npsScore);
            }
            
            return questions;
        }
        catch (Exception)
        {
            // Return fallback questions if API call fails
            return GetFallbackQuestions(npsScore);
        }
    }
    
    private List<string> GetFallbackQuestions(int npsScore)
    {
        if (npsScore >= 9)
        {
            return new List<string>
            {
                "Was hat Sie bei der Umsetzung besonders begeistert?",
                "Wie hat sich die Lösung positiv auf Ihre Arbeit ausgewirkt?",
                "Welche Aspekte würden Sie gerne in zukünftigen Projekten wiedersehen?"
            };
        }
        else if (npsScore >= 7)
        {
            return new List<string>
            {
                "Welche Aspekte der Umsetzung haben gut funktioniert?",
                "Wo sehen Sie noch Verbesserungspotential?",
                "Wie zufrieden waren Sie mit der Kommunikation während des Projekts?"
            };
        }
        else
        {
            return new List<string>
            {
                "Welche Herausforderungen sind bei der Umsetzung aufgetreten?",
                "Was hätte besser gemacht werden können?",
                "Was müsste sich ändern, damit Sie zufriedener wären?"
            };
        }
    }
}