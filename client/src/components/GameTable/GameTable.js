import React from 'react'
import { useSelector } from 'react-redux'

import Player from '../Player/Player'
import './GameTable.css'


export default function GameTable() {
    const playerIds = useSelector(state => state.players.allIds)

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
                {playerIds.map(playerId => <Player key={playerId} id={playerId}/>)}
            </tbody>
        </table>
    )
}
