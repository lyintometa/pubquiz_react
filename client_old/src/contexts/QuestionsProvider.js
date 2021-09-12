import { useContext, createContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'

const QuestionsContext = createContext()

export function useQuestions() {
    return useContext(QuestionsContext)
}

export function QuestionsProvider({ id, room, children }) {
    const socket = useSocket()
    const [showNewQuestionModal, setShowNewQuestionModal] = useState(false)
    const [canAddQuestion, setCanAddQuestion] = useState(true)

    function addQuestion(questionData) {
        socket.emit('add-question', questionData)
    }

    function openNewQuestionModal() {
        setShowNewQuestionModal(true)
    }

    function closeNewQuestionModal() {
        setShowNewQuestionModal(false)
    }

    useEffect(() => {
        if(socket == null) return
        socket.on('questions-complete', completeData => {
            setCanAddQuestion(!completeData.complete)
        })
    }, [socket])

    const value = {
        addQuestion,
        showNewQuestionModal,
        openNewQuestionModal,
        closeNewQuestionModal,
        canAddQuestion
    }
   

    return (
        <QuestionsContext.Provider value={value}>
            {children}
        </QuestionsContext.Provider>
    )
}
