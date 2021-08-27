import { useState, useEffect } from 'react'
import { useGame } from '../contexts/GameProvider'
import '../stylesheets/QuestionArea.css'

export default function QuestionArea() {
    const { ownQuestion, questionData, selectedOption, setSelectedOption, correctOption, setCorrectOption } = useGame()

    function handleSelect(option) {
        setSelectedOption(option)
    }

    function determineColor(option) {
        if (correctOption === option) return 'correct'
        if (correctOption && option !== correctOption && option === selectedOption) return 'wrong'
        if (selectedOption === option) return 'selected'
        return ''
    }

    return (
        <div>
            <p>{questionData.text}</p>
            {questionData.options.map(option => {
                return <button 
                key={option}
                className={determineColor(option)/* [selectedOption === option ? 'selected' : '', ].join(' ') */}
                disabled={ownQuestion}
                onClick={(e) => handleSelect(option)}
                >{option}</button>
            })}            
        </div>
    )
}
