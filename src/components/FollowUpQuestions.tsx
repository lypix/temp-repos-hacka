import React, { useState, useEffect } from 'react'
import { Send, Sparkles, Clock } from 'lucide-react'

interface FollowUpQuestionsProps {
  npsScore: number
  ticketInfo: {
    id: string
    title: string
    description: string
    completedDate: string
    assignee: string
  }
  onComplete: () => void
}

const FollowUpQuestions: React.FC<FollowUpQuestionsProps> = ({ 
  npsScore, 
  ticketInfo, 
  onComplete 
}) => {
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate AI-generated questions based on NPS score and ticket info
    const generateQuestions = async () => {
      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      let generatedQuestions: string[]
      
      if (npsScore >= 9) {
        generatedQuestions = [
          "What specific aspects of the implementation exceeded your expectations?",
          "How has this solution positively impacted your workflow or productivity?",
          "Would you like to see similar approaches applied to future projects?"
        ]
      } else if (npsScore >= 7) {
        generatedQuestions = [
          "What aspects of the implementation worked well for you?",
          "Are there any specific areas where you feel improvements could be made?",
          "How satisfied are you with the communication throughout the project?"
        ]
      } else {
        generatedQuestions = [
          "What were the main challenges or issues you encountered with this implementation?",
          "How could we have better addressed your needs or requirements?",
          "What would need to change for you to feel more satisfied with our service?"
        ]
      }
      
      setQuestions(generatedQuestions)
      setIsLoading(false)
    }

    generateQuestions()
  }, [npsScore, ticketInfo])

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Here you would typically send the data to your backend
    const submissionData = {
      npsScore,
      ticketInfo,
      questions,
      answers,
      timestamp: new Date().toISOString()
    }
    
    console.log('Submitting survey data:', submissionData)
    
    onComplete()
  }

  const isFormValid = answers.every(answer => answer.trim().length > 0)

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center space-x-2 text-primary-600">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <span className="text-lg font-medium">AI is generating personalized questions...</span>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Based on your NPS score and ticket details
        </div>
        <div className="mt-6">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-primary-700">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">
            AI-Generated Questions (Based on NPS Score: {npsScore}/10)
          </span>
        </div>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Question {index + 1}
          </label>
          <div className="text-gray-900 mb-2">{question}</div>
          <textarea
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            placeholder="Please share your thoughts..."
            rows={4}
            className="textarea"
            disabled={isSubmitting}
          />
        </div>
      ))}

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Estimated time: 2-3 minutes</span>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit Survey
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default FollowUpQuestions