# 🧠 NPS Intelligence - Smart Feedback Analytics

Eine innovative Lösung zur automatisierten Erfassung, Auswertung und Visualisierung von Kundenfeedback basierend auf dem Net Promoter Score (NPS) mit Azure OpenAI Integration.

## 🎯 Überblick

Das NPS Intelligence System digitalisiert den gesamten Prozess von der Umfrage bis zur Analyse und nutzt moderne Technologien wie Blazor Server, Azure OpenAI und MS-SQL für eine intelligente Kundenfeedback-Analyse.

## 🏗️ Architektur

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Survey-App    │    │  Reporting-App  │    │ Azure Functions │
│   (Blazor)      │    │   (Blazor)      │    │   (.NET 9)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
         ┌─────────────────────────────────────────────────┐
         │              Azure Services                     │
         │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
         │  │   OpenAI    │ │  SQL Server │ │    ACS      ││
         │  │   Service   │ │  Database   │ │   Email     ││
         │  └─────────────┘ └─────────────┘ └─────────────┘│
         └─────────────────────────────────────────────────┘
```

## 🚀 Features

### 1. NPS-Mailing System
- **Automatische Auswahl**: Monatlich werden 10 Personen mit abgeschlossenen Tickets ausgewählt
- **Personalisierte E-Mails**: Einmal-Links zur Umfrage über Azure Communication Services
- **Ticket-Integration**: Direkte Verknüpfung mit JIRA-Tickets

### 2. Intelligente NPS-Erfassung
- **Interaktive Skala**: 0-10 NPS-Bewertung mit visueller Rückmeldung
- **KI-generierte Fragen**: Azure OpenAI erstellt semantisch passende Folgefragen
- **Responsive Design**: Optimiert für alle Geräte
- **Ziel**: >50% Antwortquote

### 3. Sentiment-Analyse
- **Azure OpenAI Integration**: Automatische Bewertung aller Freitext-Antworten
- **Präzise Klassifikation**: "Sehr zufrieden" bis "Sehr unzufrieden"
- **Confidence Scores**: Vertrauenswerte für jede Analyse
- **Ziel**: 95% Genauigkeit, <2% Fehlklassifikationen

### 4. Insights-Dashboard
- **Echtzeit-KPIs**: Durchschnittlicher NPS, Trends, Response Rate
- **Team-Performance**: Vergleiche nach Team, Zeitraum, Tickettyp
- **Visualisierungen**: Interaktive Charts mit Blazorise
- **KI-Insights**: Automatisch generierte Handlungsempfehlungen

## 🛠️ Technologie-Stack

- **Frontend**: Blazor Server (.NET 9)
- **Backend**: ASP.NET Core, Entity Framework Core
- **Datenbank**: MS-SQL Server
- **KI**: Azure OpenAI (GPT-3.5 Turbo)
- **E-Mail**: Azure Communication Services
- **UI**: Blazorise + Bootstrap 5
- **Charts**: Blazorise.Charts
- **Hosting**: Azure Container Apps
- **CI/CD**: GitHub Actions

## 📦 Projektstruktur

```
app-template/
├── src/
│   ├── Survey-App/           # Hauptanwendung für Umfragen
│   │   ├── Components/       # Blazor-Komponenten
│   │   ├── Database/         # EF Core Entities & Context
│   │   ├── Services/         # Business Logic
│   │   └── wwwroot/         # Statische Dateien
│   └── Reporting-App/        # Dashboard & Analytics
│       ├── Components/       # Reporting-Komponenten
│       └── Services/         # Reporting Services
├── tests/                    # Unit Tests
├── Infrastructure/           # Bicep Templates
└── dev/                     # Docker Compose für lokale Entwicklung
```

## 🚀 Schnellstart

### Voraussetzungen
- .NET 9 SDK
- Docker Desktop
- Visual Studio 2022 oder VS Code
- Azure-Abonnement

### Lokale Entwicklung

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd app-template
   ```

2. **Datenbank starten**
   ```bash
   cd dev
   docker-compose up -d
   ```

3. **Abhängigkeiten installieren**
   ```bash
   dotnet restore
   ```

4. **Datenbank migrieren**
   ```bash
   dotnet ef database update --project src/Survey-App --startup-project src/Survey-App
   ```

5. **Anwendung starten**
   ```bash
   dotnet run --project src/Survey-App
   dotnet run --project src/Reporting-App
   ```

### Konfiguration

Aktualisieren Sie `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=SurveyDb;User Id=sa;Password=Password123!;Encrypt=False;TrustServerCertificate=True;"
  },
  "AzureOpenAI": {
    "Endpoint": "https://your-openai-endpoint.openai.azure.com/",
    "ApiKey": "your-api-key",
    "DeploymentName": "gpt-35-turbo"
  },
  "AzureCommunicationServices": {
    "ConnectionString": "your-acs-connection-string",
    "SenderEmail": "noreply@yourdomain.com"
  }
}
```

## 🧪 Tests ausführen

```bash
dotnet test
```

## 📊 Deployment

### Azure Container Apps

1. **Infrastructure bereitstellen**
   ```bash
   az deployment group create \
     --resource-group rg-{teamName}-apps \
     --template-file Infrastructure/survey.bicep \
     --parameters Infrastructure/survey.bicepparam
   ```

2. **GitHub Actions konfigurieren**
   - Secrets in GitHub Repository hinzufügen
   - Workflows ausführen für automatisches Deployment

### Umgebungsvariablen

Erforderliche Secrets in Azure Key Vault:
- `app-db-connstr`: Datenbankverbindung
- `open-ai-api-key`: Azure OpenAI API Key
- `open-ai-endpoint`: Azure OpenAI Endpoint
- `acs-connstr`: Azure Communication Services
- `acs-sender-email`: Absender E-Mail

## 📈 Monitoring & Analytics

### KPIs
- **NPS-Score**: Durchschnittlicher Net Promoter Score
- **Response Rate**: Antwortquote der Umfragen
- **Sentiment Accuracy**: Genauigkeit der KI-Analyse
- **Processing Time**: Durchschnittliche Bearbeitungszeit

### Dashboards
- Echtzeit-Metriken
- Trend-Analysen
- Team-Vergleiche
- Sentiment-Verteilung

## 🔒 Sicherheit

- **Authentication**: Azure AD Integration
- **Authorization**: Rollenbasierte Zugriffskontrolle
- **Data Protection**: Verschlüsselung in Transit und at Rest
- **API Security**: Rate Limiting und Input Validation

## 🤝 Beitragen

1. Fork des Repositories
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

## 📝 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe `LICENSE` Datei für Details.

## 🆘 Support

Bei Fragen oder Problemen:
- GitHub Issues erstellen
- Dokumentation konsultieren
- Team kontaktieren

---

**Powered by Azure OpenAI • .NET 9 • Blazor Server**