import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

//import AdminArea from '../AdminArea/AdminArea'
import SubmitArea from '../SubmitArea/SubmitArea'
import './GameMenu.css'

export default function GameMenu() {
    const isAdmin = useSelector(state => state.players.byId[state.info.id]?.isAdmin ?? false)
    //const { game, canAddQuestion, ready, toggleReady, questionActive } = useGameData()
    
    const questionActive = false
    //const everyoneReady = game ? game.everyoneReady : false
    //const currentPhase = game ? game.currentPhase : NOT_STARTED

    return (
        <>
            
            {!questionActive ?
            <div className="game-menu-container">
                <p>Welcome to Quarantäne Pubquiz.<br/>In this Area you will be able to answer the questions 
                which the other players in your team will ask.</p>
                <SubmitArea/>
                {/* <AdminArea initialRoomReady={everyoneReady} initialGameState={currentPhase}/> */}
            </div> : null}
            
        </>
    )
}