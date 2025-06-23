import React, { useState } from 'react'

interface NPSScaleProps {
  onScoreSelect: (score: number) => void
}

const NPSScale: React.FC<NPSScaleProps> = ({ onScoreSelect }) => {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null)
  const [selectedScore, setSelectedScore] = useState<number | null>(null)

  const handleScoreClick = (score: number) => {
    setSelectedScore(score)
    setTimeout(() => {
      onScoreSelect(score)
    }, 300)
  }

  const getScoreColor = (score: number) => {
    if (score <= 6) return 'bg-error-500 hover:bg-error-600'
    if (score <= 8) return 'bg-warning-500 hover:bg-warning-600'
    return 'bg-success-500 hover:bg-success-600'
  }

  const getScoreLabel = (score: number) => {
    if (score <= 6) return 'Detractor'
    if (score <= 8) return 'Passive'
    return 'Promoter'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-2">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            onClick={() => handleScoreClick(i)}
            onMouseEnter={() => setHoveredScore(i)}
            onMouseLeave={() => setHoveredScore(null)}
            className={`
              w-12 h-12 rounded-lg font-semibold text-white transition-all duration-200 transform
              ${selectedScore === i ? 'scale-110 ring-4 ring-primary-200' : 'hover:scale-105'}
              ${hoveredScore === i || selectedScore === i ? getScoreColor(i) : 'bg-gray-300 hover:bg-gray-400'}
            `}
          >
            {i}
          </button>
        ))}
      </div>

      {(hoveredScore !== null || selectedScore !== null) && (
        <div className="text-center animate-slide-up">
          <div className="text-lg font-semibold text-gray-900">
            {getScoreLabel(hoveredScore ?? selectedScore!)}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {hoveredScore !== null || selectedScore !== null ? (
              hoveredScore !== null ? (
                `Score: ${hoveredScore}/10`
              ) : (
                `Selected: ${selectedScore}/10`
              )
            ) : null}
          </div>
        </div>
      )}

      {selectedScore !== null && (
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg">
            <div className="animate-pulse-slow w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
            Processing your response...
          </div>
        </div>
      )}
    </div>
  )
}

export default NPSScale