import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const NPSChart: React.FC = () => {
  const data = [
    { month: 'Jan', nps: 28, responses: 45 },
    { month: 'Feb', nps: 32, responses: 52 },
    { month: 'Mar', nps: 35, responses: 48 },
    { month: 'Apr', nps: 38, responses: 61 },
    { month: 'May', nps: 42, responses: 58 },
    { month: 'Jun', nps: 45, responses: 67 },
    { month: 'Jul', nps: 41, responses: 72 },
    { month: 'Aug', nps: 44, responses: 69 },
    { month: 'Sep', nps: 47, responses: 74 },
    { month: 'Oct', nps: 43, responses: 68 },
    { month: 'Nov', nps: 46, responses: 71 },
    { month: 'Dec', nps: 42, responses: 65 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label} 2024`}</p>
          <p className="text-primary-600">
            {`NPS Score: ${payload[0].value}`}
          </p>
          <p className="text-gray-600 text-sm">
            {`${payload[0].payload.responses} responses`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="nps" 
            stroke="#2563eb" 
            strokeWidth={3}
            dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default NPSChart