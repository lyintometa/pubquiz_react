import React, { useState, useEffect } from 'react'
import Player from './Player/Player'
import { useSocket } from '../../../contexts/SocketContext.js'
import './GameTable.css'

const byScore = (a, b) =>  b.score - a.score

export default function GameTable() {
    const { socket } = useSocket()

    const [players, setPlayers] = useState([])

    useEffect(() => {
        if(!socket) return
        const handleAddPlayer = newPlayer => {
            console.log("'add-player' received", newPlayer)
            setPlayers(prevPlayers => [...prevPlayers, newPlayer].sort(byScore))
        }
        socket.on('add-player', handleAddPlayer)
        return () => socket.off('add-player', handleAddPlayer)
    }, [socket])

    useEffect(() => {
        if(!socket) return
        const handleScoreUpdate =  data => {
            const playerToUpdate = players.find(player => player.id === data.id)
            if(!playerToUpdate) return
            console.log("'score-update' received", data)
            setPlayers(prevPlayers => {
                const otherPlayers = prevPlayers.filter(player => player.id !== data.id)
                playerToUpdate.score = data.score
                return [otherPlayers, playerToUpdate].sort(byScore)
            })
        }
        socket.on('score-update', handleScoreUpdate)
        return () => socket.off('score-update', handleScoreUpdate)
    }, [socket, players])

    useEffect(() => {
        if(!socket) return
        const handleRemovePlayer = data => {
            console.log("'remove-player' received:", data)
            setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== data.id))
        }
        socket.on('remove-player', handleRemovePlayer)
        return () => socket.off('remove-player', handleRemovePlayer)
    }, [socket])

    //console.log("GameTable render")
    return (
        <table className="game-table">
            <thead>
                <tr className="game-table-header">
                    <th className="game-table-title">Score</th>
                    <th className="game-table-title">Name</th>
                    <th className="game-table-title">Answer</th>
                    <th className="game-table-title">State</th>
                </tr>
            </thead>
            <tbody>
                {players.map(player => <Player key={player.id} player={player}/>)}
            </tbody>
        </table>
    )
}
