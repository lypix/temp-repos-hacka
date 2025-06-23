using Azure.Communication.Email;

namespace SurveyApp.Services;

public class EmailService : IEmailService
{
    private readonly EmailClient _emailClient;
    private readonly IConfiguration _configuration;
    
    public EmailService(EmailClient emailClient, IConfiguration configuration)
    {
        _emailClient = emailClient;
        _configuration = configuration;
    }
    
    public async Task<bool> SendSurveyEmailAsync(string recipientEmail, string recipientName, string surveyToken, string ticketTitle)
    {
        try
        {
            var senderEmail = _configuration["AzureCommunicationServices:SenderEmail"];
            var surveyUrl = $"{_configuration["BaseUrl"]}/survey/{surveyToken}";
            
            var emailContent = new EmailContent("NPS-Umfrage: Ihr Feedback ist wichtig")
            {
                Html = $@"
                <html>
                <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
                    <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <h2 style='color: #2563eb;'>Hallo {recipientName},</h2>
                        
                        <p>wir haben kürzlich das Ticket <strong>{ticketTitle}</strong> für Sie abgeschlossen.</p>
                        
                        <p>Ihre Meinung ist uns wichtig! Bitte nehmen Sie sich 2-3 Minuten Zeit für unsere kurze Umfrage:</p>
                        
                        <div style='text-align: center; margin: 30px 0;'>
                            <a href='{surveyUrl}' 
                               style='background-color: #2563eb; color: white; padding: 12px 24px; 
                                      text-decoration: none; border-radius: 6px; font-weight: bold;'>
                                Zur Umfrage
                            </a>
                        </div>
                        
                        <p style='font-size: 14px; color: #666;'>
                            Dieser Link ist einmalig verwendbar und läuft in 7 Tagen ab.<br>
                            Falls Sie Fragen haben, antworten Sie einfach auf diese E-Mail.
                        </p>
                        
                        <hr style='margin: 30px 0; border: none; border-top: 1px solid #eee;'>
                        
                        <p style='font-size: 12px; color: #999;'>
                            Mit freundlichen Grüßen<br>
                            Ihr NPS Intelligence Team
                        </p>
                    </div>
                </body>
                </html>",
                PlainText = $@"
Hallo {recipientName},

wir haben kürzlich das Ticket '{ticketTitle}' für Sie abgeschlossen.

Ihre Meinung ist uns wichtig! Bitte nehmen Sie sich 2-3 Minuten Zeit für unsere kurze Umfrage:

{surveyUrl}

Dieser Link ist einmalig verwendbar und läuft in 7 Tagen ab.

Mit freundlichen Grüßen
Ihr NPS Intelligence Team"
            };
            
            var emailMessage = new EmailMessage(
                senderAddress: senderEmail!,
                content: emailContent,
                recipients: new EmailRecipients(new List<EmailAddress> { new EmailAddress(recipientEmail, recipientName) }));
            
            var emailSendOperation = await _emailClient.SendAsync(Azure.WaitUntil.Started, emailMessage);
            return true;
        }
        catch (Exception ex)
        {
            // Log exception in real implementation
            Console.WriteLine($"Failed to send email: {ex.Message}");
            return false;
        }
    }
}