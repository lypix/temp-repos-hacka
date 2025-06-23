using 'survey.bicep'

param teamName = '{teamName}'
param sharedUserAssignedIdentityResourceId = '/subscriptions/{subscriptionId}/resourceGroups/rg-{teamName}-apps/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id-{teamName}'

param containerAppSecrets = [
  {
    name: 'app-db-connstr'
    keyVaultUrl: 'https://kv-{teamName}.vault.azure.net/secrets/app-db-connstr'
    identity: sharedUserAssignedIdentityResourceId
  }
  {
    name: 'open-ai-api-key'
    keyVaultUrl: 'https://kv-{teamName}.vault.azure.net/secrets/open-ai-api-key'
    identity: sharedUserAssignedIdentityResourceId
  }
  {
    name: 'open-ai-endpoint'
    keyVaultUrl: 'https://kv-{teamName}.vault.azure.net/secrets/open-ai-endpoint'
    identity: sharedUserAssignedIdentityResourceId
  }
  {
    name: 'acs-connstr'
    keyVaultUrl: 'https://kv-{teamName}.vault.azure.net/secrets/acs-connstr'
    identity: sharedUserAssignedIdentityResourceId
  }
  {
    name: 'acs-sender-email'
    keyVaultUrl: 'https://kv-{teamName}.vault.azure.net/secrets/acs-sender-email'
    identity: sharedUserAssignedIdentityResourceId
  }
]

param environmentVariables = [
  {
    name: 'ConnectionStrings__DefaultConnection'
    secretRef: 'app-db-connstr'
  }
  {
    name: 'AzureOpenAI__ApiKey'
    secretRef: 'open-ai-api-key'
  }
  {
    name: 'AzureOpenAI__Endpoint'
    secretRef: 'open-ai-endpoint'
  }
  {
    name: 'AzureCommunicationServices__ConnectionString'
    secretRef: 'acs-connstr'
  }
  {
    name: 'AzureCommunicationServices__SenderEmail'
    secretRef: 'acs-sender-email'
  }
  {
    name: 'ASPNETCORE_ENVIRONMENT'
    value: 'Production'
  }
]