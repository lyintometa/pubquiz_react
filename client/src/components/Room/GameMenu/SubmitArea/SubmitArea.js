import React, { useState, useEffect } from 'react'
import useValueListener from '../../../../hooks/useValueListener'
//import { useLocalData } from '../../../../contexts/LocalDataContext'
import { useSocket } from '../../../../contexts/SocketContext'
import { useLocalData } from '../../../../contexts/LocalDataContext'
import { useGameData } from '../../../../contexts/GameDataContext'
import NewQuestionModal from './NewQuestionModal/NewQuestionModal'

const NOT_STARTED = "notStarted"
const ROUND_IN_PROGRESS = "roundInProgress"
const ROUND_OVER = "roundOver"
const GAME_OVER = "over"


export default function AdminArea({ initialRoomReady, initialGameState}) {
    const { socket } = useSocket()
    const { id } = useLocalData()
    const { game, ready, toggleReady, openNewQuestionModal, questionActive } = useGameData()

    const [canAddQuestion, setCanAddQuestion ] = useState(true)
    
    useEffect(() => {
        if(!socket) return
        socket.on('questions-complete', () => {
            console.log("'questions-complete' received")
            setCanAddQuestion(false)
        })
        return () => socket.off('questions-complete')
    }, [socket])

    const isAdmin = useValueListener(socket, 'isAdmin', () => new Promise(resolve => 
        socket.emit('get-isAdmin', res => resolve(res.isAdmin))), id)

    const questionsToSubmitArea = 
        <div>
            <p> But first you have to submit some questions 
                of your own. Use the button below.</p>
            <button onClick={() => openNewQuestionModal()}>Add Question</button>
        </div>

    const noQuestionsToSubmitArea = isAdmin ?
        <div>
            <p>You submitted all questions, wait for the other players to be ready to be able to start the game.</p>
        </div> :
        <div>
            <p>You submitted all questions, wait for the other players to be ready and the game to start.</p>
            <button onClick={() => toggleReady()}>{!ready ? "Ready" : "Not ready"}</button>
        </div>

    return (
        <>
            <NewQuestionModal/>
            {canAddQuestion ? questionsToSubmitArea : noQuestionsToSubmitArea}
        </>
        
    )
}
