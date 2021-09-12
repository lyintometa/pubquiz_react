import React, { useState, useEffect } from 'react'
import useValueListener from '../../../../hooks/useValueListener'
import { useLocalData } from '../../../../contexts/LocalDataContext'
import { useSocket } from '../../../../contexts/SocketContext'

const NOT_STARTED = "notStarted"
const ROUND_IN_PROGRESS = "roundInProgress"
const ROUND_OVER = "roundOver"
const GAME_OVER = "over"


export default function AdminArea({ initialRoomReady, initialGameState}) {
    const { socket } = useSocket()
    const { id } = useLocalData()

    const [roomReady, setRoomReady] = useState(initialRoomReady)
    const [gameState, setGameState] = useState(initialGameState)
    
    const isAdmin = useValueListener(socket, 'isAdmin', () => new Promise(resolve => 
        socket.emit('get-isAdmin', res => resolve(res.isAdmin))), id)

    const continueGame = () => socket.emit('continue-game')

    //Listen to room ready updates
    useEffect(() => {
        if (!socket) return
        const handleRoomReadyUpdate = ready => setRoomReady(ready)
        socket.on('room-ready-update', handleRoomReadyUpdate)
        return () => socket.off('room-ready-update', handleRoomReadyUpdate)
    }, [socket])

    //Listen to game state updates
    useEffect(() => {
        if (!socket) return
        const handleGameStateUpdate = state => setGameState(state)
        socket.on('game-state-update', handleGameStateUpdate)
        return () => socket.off('game-state-update', handleGameStateUpdate)
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
