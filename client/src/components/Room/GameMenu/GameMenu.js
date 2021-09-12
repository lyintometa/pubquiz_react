import React, { useState, useEffect } from 'react'
import AdminArea from './AdminArea/AdminArea'
import SubmitArea from './SubmitArea/SubmitArea'
import { useGameData } from '../../../contexts/GameDataContext'
import { useLocalData } from '../../../contexts/LocalDataContext'
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

    return (
        <>
            
            {!questionActive ?
            <div className="game-menu-container">
                <p>Welcome to Quarantäne Pubquiz.<br/>In this Area you will be able to answer the questions 
                which the other players in your team will ask.</p>
                <SubmitArea/>
                <AdminArea initialRoomReady={everyoneReady} initialGameState={currentPhase}/>
            </div> : null}
            
        </>
    )
}