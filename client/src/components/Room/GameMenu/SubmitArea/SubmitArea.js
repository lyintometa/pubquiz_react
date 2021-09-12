import React, { useState, useEffect } from 'react'
import useValueListener from '../../../../hooks/useValueListener'
//import { useLocalData } from '../../../../contexts/LocalDataContext'
import { useSocket } from '../../../../contexts/SocketContext'

const NOT_STARTED = "notStarted"
const ROUND_IN_PROGRESS = "roundInProgress"
const ROUND_OVER = "roundOver"
const GAME_OVER = "over"


export default function AdminArea({ initialRoomReady, initialGameState}) {
    const { socket } = useSocket()

    const [canAddQuestion, setCanAddQuestion ] = useState(true)
    
    useEffect(() => {
        if(!socket) return
        socket.on('questions-complete', () => {
            console.log("'questions-complete' received")
            setCanAddQuestion(false)
        })
        return () => socket.off('questions-complete')
    }, [socket])

    return (
        <>
            {isAdmin ? <div className="admin-area">
                {/* <input type="number"/> */}
                {/* add "mode" selection */}
                <p>Here are also your admin controls, you can use them to start the game (and soon to change the 
                game settings).</p>
                <button onClick={continueGame} disabled={!roomReady}>
                    {gameState === NOT_STARTED ? "Start Game" : null}
                    {gameState === ROUND_IN_PROGRESS || gameState === ROUND_OVER  ? "Next Question" : null}
                    {gameState === GAME_OVER ? "Results" : null}
                </button>
            </div> : null}
        </>
        
    )
}
