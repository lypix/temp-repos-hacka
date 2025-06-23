import React from 'react'
import { MessageSquare, Clock, User, Star } from 'lucide-react'

const RecentFeedback: React.FC = () => {
  const feedbackItems = [
    {
      id: 1,
      npsScore: 9,
      sentiment: 'Very Satisfied',
      sentimentColor: 'text-success-600',
      feedback: 'The authentication system works flawlessly. Great job on the implementation!',
      ticketId: 'JIRA-1234',
      respondent: 'John D.',
      timestamp: '2 hours ago',
      confidence: 0.95
    },
    {
      id: 2,
      npsScore: 6,
      sentiment: 'Neutral',
      sentimentColor: 'text-warning-600',
      feedback: 'The feature works but could use some UI improvements for better usability.',
      ticketId: 'JIRA-1235',
      respondent: 'Sarah M.',
      timestamp: '4 hours ago',
      confidence: 0.87
    },
    {
      id: 3,
      npsScore: 8,
      sentiment: 'Satisfied',
      sentimentColor: 'text-success-500',
      feedback: 'Good implementation overall. The performance is much better than expected.',
      ticketId: 'JIRA-1236',
      respondent: 'Mike R.',
      timestamp: '6 hours ago',
      confidence: 0.92
    },
    {
      id: 4,
      npsScore: 4,
      sentiment: 'Dissatisfied',
      sentimentColor: 'text-error-600',
      feedback: 'The deployment process was problematic and caused downtime issues.',
      ticketId: 'JIRA-1237',
      respondent: 'Lisa K.',
      timestamp: '8 hours ago',
      confidence: 0.89
    },
    {
      id: 5,
      npsScore: 10,
      sentiment: 'Very Satisfied',
      sentimentColor: 'text-success-600',
      feedback: 'Excellent work! The new dashboard is intuitive and exactly what we needed.',
      ticketId: 'JIRA-1238',
      respondent: 'David L.',
      timestamp: '1 day ago',
      confidence: 0.98
    }
  ]

  const getNPSColor = (score: number) => {
    if (score >= 9) return 'text-success-600 bg-success-50'
    if (score >= 7) return 'text-warning-600 bg-warning-50'
    return 'text-error-600 bg-error-50'
  }

  return (
    <div className="space-y-4">
      {feedbackItems.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`px-2 py-1 rounded-full text-sm font-medium ${getNPSColor(item.npsScore)}`}>
                {item.npsScore}/10
              </div>
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-medium ${item.sentimentColor}`}>
                  {item.sentiment}
                </span>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Star className="h-3 w-3" />
                  <span>{(item.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{item.timestamp}</span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-3 leading-relaxed">
            "{item.feedback}"
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-500">
                <MessageSquare className="h-4 w-4" />
                <span>{item.ticketId}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <User className="h-4 w-4" />
                <span>{item.respondent}</span>
              </div>
            </div>
            
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecentFeedback