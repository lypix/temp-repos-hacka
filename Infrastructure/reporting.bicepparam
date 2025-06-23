using 'reporting.bicep'

param teamName = '{teamName}'
param sharedUserAssignedIdentityResourceId = '/subscriptions/{subscriptionId}/resourceGroups/rg-{teamName}-apps/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id-{teamName}'

param containerAppSecrets = [
  {
    name: 'ro-db-connstr'
    keyVaultUrl: 'https://kv-{teamName}.vault.azure.net/secrets/ro-db-connstr'
    identity: sharedUserAssignedIdentityResourceId
  }
]

param environmentVariables = [
  {
    name: 'ConnectionStrings__ReportingConnection'
    secretRef: 'ro-db-connstr'
  }
  {
    name: 'ASPNETCORE_ENVIRONMENT'
    value: 'Production'
  }
]