import React, { useState, useEffect } from 'react'
import AdminArea from './AdminArea/AdminArea'
import { useGameData } from '../../../contexts/GameDataContext'
import { useLocalData } from '../../../contexts/LocalDataContext'
import NewQuestionModal from '../../NewQuestionModal'
import './GameMenu.css'
import { useSocket } from '../../../contexts/SocketContext'

const NOT_STARTED = "notStarted"
const ROUND_IN_PROGRESS = "roundInProgress"
const ROUND_OVER = "roundOver"
const GAME_OVER = "over"

export default function GameMenu() {
    const { socket } = useSocket()
    const { game, canAddQuestion, ready, toggleReady, openNewQuestionModal, questionActive } = useGameData()
    const { id } = useLocalData()

    const [isAdmin, setIsAdmin] = useState(false)
    

    const everyoneReady = game ? game.everyoneReady : false
    const currentPhase = game ? game.currentPhase : NOT_STARTED

    // change to single fire event
    useEffect(() => {
        if(!socket) return
        const handleAddPlayer = newPlayer => {
            if (newPlayer.id !== id) return
            console.log("'add-player' received", newPlayer)
            setIsAdmin(newPlayer.isAdmin)
        }
        socket.on('add-player', handleAddPlayer)
        return () => socket.off('add-player', handleAddPlayer)
    }, [socket, id])

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
            <NewQuestionModal />
            
            {!questionActive ?
            <div className="game-menu-container">
                <p>Welcome to Quarantäne Pubquiz.<br/>In this Area you will be able to answer the questions 
                which the other players in your team will ask.</p>
                {canAddQuestion ? questionsToSubmitArea : noQuestionsToSubmitArea}
                <AdminArea initialRoomReady={everyoneReady} initialGameState={currentPhase}/>
            </div> : null}
            
        </>
    )
}