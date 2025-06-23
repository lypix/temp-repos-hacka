import React, { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Filter, 
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import NPSChart from '../components/NPSChart'
import SentimentChart from '../components/SentimentChart'
import TeamPerformance from '../components/TeamPerformance'
import FeedbackAnalysis from '../components/FeedbackAnalysis'

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedTeam, setSelectedTeam] = useState('all')

  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
  ]

  const teams = [
    { value: 'all', label: 'All Teams' },
    { value: 'frontend', label: 'Frontend Team' },
    { value: 'backend', label: 'Backend Team' },
    { value: 'devops', label: 'DevOps Team' },
    { value: 'qa', label: 'QA Team' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">
            Deep insights into customer satisfaction and feedback trends
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="input w-40"
          >
            {teams.map(team => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </select>
          
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input w-40"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          
          <button className="btn-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <span className="text-sm text-success-600 font-medium">+15%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">42.3</div>
          <div className="text-sm text-gray-600">Average NPS Score</div>
          <div className="text-xs text-gray-500 mt-1">Industry benchmark: 31</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-success-50 rounded-lg">
              <Users className="h-6 w-6 text-success-600" />
            </div>
            <span className="text-sm text-success-600 font-medium">+8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">68%</div>
          <div className="text-sm text-gray-600">Response Rate</div>
          <div className="text-xs text-gray-500 mt-1">Target achieved: 50%</div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-warning-50 rounded-lg">
              <Activity className="h-6 w-6 text-warning-600" />
            </div>
            <span className="text-sm text-error-600 font-medium">-2%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">95.2%</div>
          <div className="text-sm text-gray-600">AI Accuracy</div>
          <div className="text-xs text-gray-500 mt-1">Sentiment classification</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">NPS Trend Analysis</h3>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View Details
            </button>
          </div>
          <NPSChart />
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Sentiment Distribution</h3>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View Details
            </button>
          </div>
          <SentimentChart />
        </div>
      </div>

      {/* Team Performance */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">
            View All Teams
          </button>
        </div>
        <TeamPerformance />
      </div>

      {/* Feedback Analysis */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Feedback Analysis</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Activity className="h-4 w-4" />
            <span>95.2% accuracy</span>
          </div>
        </div>
        <FeedbackAnalysis />
      </div>
    </div>
  )
}

export default Analytics