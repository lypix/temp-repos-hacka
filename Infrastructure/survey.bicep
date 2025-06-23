@description('The name of the team')
param teamName string

@description('The location for all resources')
param location string = resourceGroup().location

@description('Container app secrets')
param containerAppSecrets array = []

@description('Environment variables for the container app')
param environmentVariables array = []

@description('Shared user assigned identity resource ID')
param sharedUserAssignedIdentityResourceId string

// Container Apps Environment
resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2023-05-01' existing = {
  name: 'cae-${teamName}'
}

// Survey App Container App
resource surveyApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: 'survey-${teamName}'
  location: location
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${sharedUserAssignedIdentityResourceId}': {}
    }
  }
  properties: {
    managedEnvironmentId: containerAppsEnvironment.id
    configuration: {
      secrets: containerAppSecrets
      ingress: {
        external: true
        targetPort: 8080
        allowInsecure: false
        traffic: [
          {
            weight: 100
            latestRevision: true
          }
        ]
      }
      registries: [
        {
          server: 'ghcr.io'
          identity: sharedUserAssignedIdentityResourceId
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'survey-app'
          image: 'ghcr.io/${teamName}/survey-app:latest'
          env: environmentVariables
          resources: {
            cpu: json('0.5')
            memory: '1Gi'
          }
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 3
      }
    }
  }
}

output surveyAppUrl string = 'https://${surveyApp.properties.configuration.ingress.fqdn}'