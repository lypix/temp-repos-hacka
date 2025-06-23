namespace SurveyApp.Services;

public interface IEmailService
{
    Task<bool> SendSurveyEmailAsync(string recipientEmail, string recipientName, string surveyToken, string ticketTitle);
}