import React, { useState } from 'react'
import { 
  Save, 
  Mail, 
  Brain, 
  Users, 
  Bell,
  Shield,
  Database,
  Zap
} from 'lucide-react'

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Email Settings
    emailEnabled: true,
    emailFrequency: 'monthly',
    emailTemplate: 'default',
    senderEmail: 'noreply@company.com',
    
    // AI Settings
    aiModel: 'gpt-35-turbo',
    sentimentThreshold: 0.8,
    questionGeneration: true,
    autoAnalysis: true,
    
    // Survey Settings
    responseTarget: 50,
    surveyTimeout: 7,
    reminderEnabled: true,
    anonymousResponses: false,
    
    // Notification Settings
    slackNotifications: true,
    emailReports: true,
    realTimeAlerts: false,
  })

  const handleSave = () => {
    // Save settings logic
    console.log('Saving settings:', settings)
  }

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">
            Configure your NPS Intelligence system preferences
          </p>
        </div>
        
        <button onClick={handleSave} className="btn-primary">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Email Configuration */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <Mail className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Email Configuration</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Survey Frequency
            </label>
            <select 
              value={settings.emailFrequency}
              onChange={(e) => updateSetting('emailFrequency', e.target.value)}
              className="input"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sender Email
            </label>
            <input
              type="email"
              value={settings.senderEmail}
              onChange={(e) => updateSetting('senderEmail', e.target.value)}
              className="input"
            />
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailEnabled"
                checked={settings.emailEnabled}
                onChange={(e) => updateSetting('emailEnabled', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="emailEnabled" className="ml-2 text-sm text-gray-700">
                Enable automated email surveys
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* AI Configuration */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <Brain className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Configuration</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Model
            </label>
            <select 
              value={settings.aiModel}
              onChange={(e) => updateSetting('aiModel', e.target.value)}
              className="input"
            >
              <option value="gpt-35-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sentiment Confidence Threshold
            </label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.1"
              value={settings.sentimentThreshold}
              onChange={(e) => updateSetting('sentimentThreshold', parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              Current: {(settings.sentimentThreshold * 100).toFixed(0)}%
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="questionGeneration"
                checked={settings.questionGeneration}
                onChange={(e) => updateSetting('questionGeneration', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="questionGeneration" className="ml-2 text-sm text-gray-700">
                Enable AI-generated follow-up questions
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoAnalysis"
                checked={settings.autoAnalysis}
                onChange={(e) => updateSetting('autoAnalysis', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="autoAnalysis" className="ml-2 text-sm text-gray-700">
                Enable automatic sentiment analysis
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Settings */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <Users className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Survey Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Response Rate Target (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={settings.responseTarget}
              onChange={(e) => updateSetting('responseTarget', parseInt(e.target.value))}
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Survey Timeout (days)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={settings.surveyTimeout}
              onChange={(e) => updateSetting('surveyTimeout', parseInt(e.target.value))}
              className="input"
            />
          </div>
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="reminderEnabled"
                checked={settings.reminderEnabled}
                onChange={(e) => updateSetting('reminderEnabled', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="reminderEnabled" className="ml-2 text-sm text-gray-700">
                Send reminder emails for incomplete surveys
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymousResponses"
                checked={settings.anonymousResponses}
                onChange={(e) => updateSetting('anonymousResponses', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymousResponses" className="ml-2 text-sm text-gray-700">
                Allow anonymous responses
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Slack Notifications</div>
              <div className="text-sm text-gray-500">Get notified in Slack for new responses</div>
            </div>
            <input
              type="checkbox"
              checked={settings.slackNotifications}
              onChange={(e) => updateSetting('slackNotifications', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Email Reports</div>
              <div className="text-sm text-gray-500">Weekly summary reports via email</div>
            </div>
            <input
              type="checkbox"
              checked={settings.emailReports}
              onChange={(e) => updateSetting('emailReports', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Real-time Alerts</div>
              <div className="text-sm text-gray-500">Instant notifications for low NPS scores</div>
            </div>
            <input
              type="checkbox"
              checked={settings.realTimeAlerts}
              onChange={(e) => updateSetting('realTimeAlerts', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <Zap className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-700">Azure OpenAI</div>
              <div className="text-xs text-gray-500">Connected</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-700">Database</div>
              <div className="text-xs text-gray-500">Healthy</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-700">Email Service</div>
              <div className="text-xs text-gray-500">Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings