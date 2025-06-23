namespace SurveyApp.Services;

public interface IOpenAIService
{
    Task<List<string>> GenerateFollowUpQuestionsAsync(int npsScore, string ticketTitle, string ticketDescription);
}