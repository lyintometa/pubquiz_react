import React, { useEffect, useState, useContext, useRef} from 'react'
import { useSocket } from './SocketContext'

const GameDataContext = React.createContext()

export function useGameData() {
    return useContext(GameDataContext)
}

export function GameDataProvider({ children }) {
    const { socket } = useSocket()

    const [game, setGame] = useState(null)
    const [questionActive, setQuestionActive ] = useState(false)
    const [canAddQuestion, setCanAddQuestion ] = useState(true)
    const [ready, setReady ] = useState(false)
    const [showNewQuestionModal, setShowNewQuestionModal] = useState(false)

    const openNewQuestionModal = () => setShowNewQuestionModal(true)
    const closeNewQuestionModal = () => setShowNewQuestionModal(false)

    const toggleReady = () => {
        setReady(!ready)
        socket.emit('toggle-ready')
    }

    const addQuestion = questionData => socket.emit('add-question', questionData)

    useEffect(() => {
        if(!socket) return
        socket.on('update-game-data', gameData => {
            console.log("'update-game-data' received", gameData)
            setGame(formatGameData(gameData))
        })
        return () => socket.off('update-game-data')
    }, [socket])

    useEffect(() => {
        if(!socket) return
        socket.on('ask-question', () => {
            console.log("'ask-question' received")
            setQuestionActive(true)
        })
        return () => socket.off('update-game-data')
    }, [socket])

    

    const formatGameData = gameData => {
        return {
            rounds: gameData.rounds,
            currentPhase: gameData.currentPhase,
            everyoneReady: gameData.everyoneReady
        }
    }
    
    const value = {
        game,
        canAddQuestion,
        ready,
        toggleReady,
        showNewQuestionModal,
        openNewQuestionModal,
        closeNewQuestionModal,
        addQuestion,
        questionActive
    }

    return (
        <GameDataContext.Provider value={value}>
            {children}
        </GameDataContext.Provider>
    )
}
