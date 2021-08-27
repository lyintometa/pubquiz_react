import { useState } from 'react'
import { useRoom } from '../contexts/RoomProvider'

export default function Results() {
    const { playersData } = useRoom()

    return (
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {playersData.map(player => (                    
                    <tr key={player.id}>
                        <td>{playersData.indexOf(player) + 1}</td>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                    </tr>
                ))}
            </tbody>            
        </table>
    )
}
