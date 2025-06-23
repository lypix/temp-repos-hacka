import React from 'react'
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

const FeedbackAnalysis: React.FC = () => {
  const analysisData = {
    totalAnalyzed: 1247,
    accuracy: 95.2,
    processingTime: '0.8s',
    lastUpdated: '2 minutes ago',
    categories: [
      {
        name: 'Implementation Quality',
        sentiment: 'positive',
        confidence: 0.92,
        mentions: 234,
        trend: 'up',
        keywords: ['excellent', 'well-implemented', 'robust', 'clean code']
      },
      {
        name: 'Communication',
        sentiment: 'positive',
        confidence: 0.88,
        mentions: 189,
        trend: 'up',
        keywords: ['clear', 'responsive', 'helpful', 'timely']
      },
      {
        name: 'Performance',
        sentiment: 'neutral',
        confidence: 0.85,
        mentions: 156,
        trend: 'stable',
        keywords: ['fast', 'slow', 'optimization', 'loading']
      },
      {
        name: 'User Experience',
        sentiment: 'positive',
        confidence: 0.91,
        mentions: 198,
        trend: 'up',
        keywords: ['intuitive', 'user-friendly', 'easy', 'smooth']
      },
      {
        name: 'Documentation',
        sentiment: 'negative',
        confidence: 0.79,
        mentions: 87,
        trend: 'down',
        keywords: ['unclear', 'missing', 'incomplete', 'confusing']
      }
    ],
    insights: [
      {
        type: 'positive',
        title: 'Strong Implementation Feedback',
        description: 'Customers consistently praise code quality and implementation approach',
        impact: 'high'
      },
      {
        type: 'warning',
        title: 'Documentation Concerns',
        description: 'Multiple mentions of unclear or missing documentation',
        impact: 'medium'
      },
      {
        type: 'info',
        title: 'Performance Optimization Opportunity',
        description: 'Mixed feedback on performance suggests room for improvement',
        impact: 'medium'
      }
    ]
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success-600 bg-success-50'
      case 'negative':
        return 'text-error-600 bg-error-50'
      default:
        return 'text-warning-600 bg-warning-50'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success-600" />
      case 'down':
        return <TrendingUp className="h-4 w-4 text-error-600 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="h-5 w-5 text-success-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning-600" />
      default:
        return <Brain className="h-5 w-5 text-primary-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Analysis Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Total Analyzed</span>
          </div>
          <div className="text-2xl font-bold text-primary-900">{analysisData.totalAnalyzed.toLocaleString()}</div>
        </div>

        <div className="bg-success-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-success-600" />
            <span className="text-sm font-medium text-success-700">Accuracy</span>
          </div>
          <div className="text-2xl font-bold text-success-900">{analysisData.accuracy}%</div>
        </div>

        <div className="bg-warning-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-warning-600" />
            <span className="text-sm font-medium text-warning-700">Avg Processing</span>
          </div>
          <div className="text-2xl font-bold text-warning-900">{analysisData.processingTime}</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Last Updated</span>
          </div>
          <div className="text-sm font-medium text-gray-900">{analysisData.lastUpdated}</div>
        </div>
      </div>

      {/* Category Analysis */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Sentiment by Category</h4>
        <div className="space-y-3">
          {analysisData.categories.map((category) => (
            <div key={category.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h5 className="font-medium text-gray-900">{category.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(category.sentiment)}`}>
                    {category.sentiment}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(category.trend)}
                    <span className="text-sm text-gray-500">{category.mentions} mentions</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {(category.confidence * 100).toFixed(0)}% confidence
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.keywords.map((keyword) => (
                  <span key={keyword} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Insights</h4>
        <div className="space-y-3">
          {analysisData.insights.map((insight, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-gray-900">{insight.title}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      insight.impact === 'high' ? 'bg-error-50 text-error-700' :
                      insight.impact === 'medium' ? 'bg-warning-50 text-warning-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {insight.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeedbackAnalysis