import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const TeamPerformance: React.FC = () => {
  const data = [
    { 
      team: 'Frontend', 
      nps: 48, 
      responses: 89, 
      trend: 'up',
      change: '+12%',
      satisfaction: 8.2 
    },
    { 
      team: 'Backend', 
      nps: 42, 
      responses: 76, 
      trend: 'up',
      change: '+8%',
      satisfaction: 7.8 
    },
    { 
      team: 'DevOps', 
      nps: 38, 
      responses: 54, 
      trend: 'down',
      change: '-3%',
      satisfaction: 7.1 
    },
    { 
      team: 'QA', 
      nps: 45, 
      responses: 67, 
      trend: 'stable',
      change: '0%',
      satisfaction: 7.9 
    },
    { 
      team: 'Design', 
      nps: 52, 
      responses: 43, 
      trend: 'up',
      change: '+15%',
      satisfaction: 8.7 
    }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label} Team</p>
          <div className="space-y-1 text-sm">
            <p className="text-primary-600">NPS Score: {data.nps}</p>
            <p className="text-gray-600">Responses: {data.responses}</p>
            <p className="text-gray-600">Satisfaction: {data.satisfaction}/10</p>
            <p className={`font-medium ${
              data.trend === 'up' ? 'text-success-600' : 
              data.trend === 'down' ? 'text-error-600' : 'text-gray-600'
            }`}>
              Trend: {data.change}
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-error-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-success-600'
      case 'down':
        return 'text-error-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="team" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="nps" 
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Team Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((team) => (
          <div key={team.team} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{team.team}</h4>
              <div className="flex items-center space-x-1">
                {getTrendIcon(team.trend)}
                <span className={`text-sm font-medium ${getTrendColor(team.trend)}`}>
                  {team.change}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">NPS Score:</span>
                <span className="font-medium text-gray-900">{team.nps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Responses:</span>
                <span className="font-medium text-gray-900">{team.responses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Satisfaction:</span>
                <span className="font-medium text-gray-900">{team.satisfaction}/10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamPerformance