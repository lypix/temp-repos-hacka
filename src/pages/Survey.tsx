import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Send, CheckCircle, MessageSquare } from 'lucide-react'
import NPSScale from '../components/NPSScale'
import FollowUpQuestions from '../components/FollowUpQuestions'

const Survey: React.FC = () => {
  const { id } = useParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [npsScore, setNpsScore] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ticketInfo, setTicketInfo] = useState({
    id: 'JIRA-1234',
    title: 'Implement user authentication system',
    description: 'Add OAuth2 integration with multi-factor authentication support for enhanced security',
    completedDate: '2025-01-15',
    assignee: 'John Doe'
  })

  useEffect(() => {
    // Simulate loading ticket information based on survey ID
    if (id) {
      // In real implementation, fetch ticket details from API
      console.log('Loading survey for ID:', id)
    }
  }, [id])

  const handleNPSSubmit = (score: number) => {
    setNpsScore(score)
    setCurrentStep(2)
  }

  const handleSurveyComplete = () => {
    setIsSubmitted(true)
    setCurrentStep(3)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center animate-slide-up">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-success-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You for Your Feedback!
            </h1>
            <p className="text-gray-600">
              Your response has been recorded and will help us improve our services.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-2">Your NPS Score</div>
            <div className="text-3xl font-bold text-primary-600">{npsScore}/10</div>
          </div>
          
          <p className="text-sm text-gray-500">
            We appreciate you taking the time to share your experience with us.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Customer Satisfaction Survey
        </h1>
        <p className="text-gray-600">
          Help us improve by sharing your experience with our recent work
        </p>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{currentStep}/2</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Ticket Information */}
      <div className="card">
        <div className="flex items-start space-x-3">
          <MessageSquare className="h-5 w-5 text-primary-600 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Completed Ticket: {ticketInfo.id}
            </h3>
            <h4 className="text-lg text-gray-800 mb-2">{ticketInfo.title}</h4>
            <p className="text-gray-600 mb-3">{ticketInfo.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Completed: {ticketInfo.completedDate}</span>
              <span>•</span>
              <span>Assignee: {ticketInfo.assignee}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Steps */}
      {currentStep === 1 && (
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              How likely are you to recommend our services?
            </h2>
            <p className="text-gray-600">
              Please rate your experience on a scale from 0 to 10
            </p>
          </div>
          
          <NPSScale onScoreSelect={handleNPSSubmit} />
          
          <div className="mt-8 flex justify-between text-sm text-gray-500">
            <span>Not at all likely</span>
            <span>Extremely likely</span>
          </div>
        </div>
      )}

      {currentStep === 2 && npsScore !== null && (
        <div className="card">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Follow-up Questions
              </h2>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">NPS Score: {npsScore}/10</span>
              </div>
            </div>
            <p className="text-gray-600">
              Please help us understand your experience better by answering these questions.
            </p>
          </div>
          
          <FollowUpQuestions 
            npsScore={npsScore}
            ticketInfo={ticketInfo}
            onComplete={handleSurveyComplete}
          />
        </div>
      )}
    </div>
  )
}

export default Survey