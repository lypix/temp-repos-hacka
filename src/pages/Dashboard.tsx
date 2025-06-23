import React from 'react'
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter
} from 'lucide-react'
import NPSChart from '../components/NPSChart'
import SentimentChart from '../components/SentimentChart'
import RecentFeedback from '../components/RecentFeedback'

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'Average NPS Score',
      value: '42',
      change: '+12%',
      changeType: 'positive',
      icon: Target,
      description: 'vs last month'
    },
    {
      name: 'Response Rate',
      value: '68%',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      description: 'Target: 50%'
    },
    {
      name: 'Total Responses',
      value: '1,247',
      change: '+23%',
      changeType: 'positive',
      icon: MessageSquare,
      description: 'This month'
    },
    {
      name: 'Sentiment Score',
      value: '7.8/10',
      change: '-2%',
      changeType: 'negative',
      icon: TrendingUp,
      description: 'AI Analysis'
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor your NPS performance and customer satisfaction trends
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="btn-secondary">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary-600" />
                </div>
              </div>
              <div className={`flex items-center text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
              }`}>
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.name}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">NPS Trend</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View Details
            </button>
          </div>
          <NPSChart />
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Sentiment Analysis</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View Details
            </button>
          </div>
          <SentimentChart />
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Feedback</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700">
            View All
          </button>
        </div>
        <RecentFeedback />
      </div>
    </div>
  )
}

export default Dashboard