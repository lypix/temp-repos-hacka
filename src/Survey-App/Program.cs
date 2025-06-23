using Microsoft.EntityFrameworkCore;
using SurveyApp.Database;
using SurveyApp.Services;
using Azure.AI.OpenAI;
using Azure.Communication.Email;
using Blazorise;
using Blazorise.Bootstrap5;
using Blazorise.Icons.FontAwesome;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

// Database
builder.Services.AddDbContext<SurveyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Azure Services
builder.Services.AddSingleton<OpenAIClient>(provider =>
{
    var endpoint = builder.Configuration["AzureOpenAI:Endpoint"];
    var apiKey = builder.Configuration["AzureOpenAI:ApiKey"];
    return new OpenAIClient(new Uri(endpoint!), new Azure.AzureKeyCredential(apiKey!));
});

builder.Services.AddSingleton<EmailClient>(provider =>
{
    var connectionString = builder.Configuration["AzureCommunicationServices:ConnectionString"];
    return new EmailClient(connectionString);
});

// Custom Services
builder.Services.AddScoped<INPSService, NPSService>();
builder.Services.AddScoped<IOpenAIService, OpenAIService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ISentimentAnalysisService, SentimentAnalysisService>();

// Blazorise
builder.Services
    .AddBlazorise(options =>
    {
        options.Immediate = true;
    })
    .AddBootstrap5Providers()
    .AddFontAwesomeIcons();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapRazorPages();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SurveyDbContext>();
    context.Database.EnsureCreated();
}

app.Run();