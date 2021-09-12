import { useContext, createContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'

const GameContext = createContext()

export function useGame() {
    return useContext(GameContext)
}

export function GameProvider({ gameState, setGameState, children }) {
    const [ownQuestion, setOwnQuestion] = useState(false)
    const [questionData, setQuestionData] = useState({text: "Placeholder Text", options: ["option1", "option2", "option3", "option4"]})
    const [selectedOption, setSelectedOption] = useState()
    const [correctOption, setCorrectOption] = useState()
    const [readyState, setReadyState] = useState(false)
    const socket = useSocket()

    const continueGame = () => socket.emit('request-continue-game')

    useEffect(() => {
        if(socket == null) return
        socket.on('ask-question', ({ yourQuestion, text, options }) => {
            setGameState('running')
            setOwnQuestion(yourQuestion)
            setQuestionData({text, options})
            setSelectedOption(null)
            setCorrectOption(null)
        })
        return () => socket.off('ask-question')
    }, [socket])

    useEffect(() => {
        if(socket == null) return
        socket.on('reveil-answer', answer => {
            setCorrectOption(answer)
        })
        return () => socket.off('reveil-answer')
    }, [socket])

    useEffect(() => {
        if (!selectedOption) return
        socket.emit('set-answer', selectedOption)
    }, [selectedOption])

    useEffect(() => {
        socket.emit('set-state', readyState)
    }, [readyState])

    useEffect(() => {
        if(socket == null) return
        socket.on('end-game', answer => {
            setGameState('finished')
        })
        return () => socket.off('end-game')
    }, [socket])

    const value = {
        continueGame,
        ownQuestion,
        questionData,
        selectedOption,
        setSelectedOption,
        correctOption,
        setCorrectOption,
        readyState,
        setReadyState
    }
   

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}
