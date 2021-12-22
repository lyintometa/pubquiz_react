import React from 'react'
import { useSelector } from 'react-redux'

import { GiCheckMark } from 'react-icons/gi';
import { FaCrown } from 'react-icons/fa';

import './Player.css'

export default function Player({ id }) {
    const ownId = useSelector(state => state.info.id)
    const player = useSelector(state => state.players.byId[id])

    if (!player.isConnected) return null
 
    return (
        <tr className={id === ownId ? "player self" : "player"}>
            <td className="player-data score">{player.score}</td>
            <td className="player-data name">{player.name}</td>
            <td className="player-data answer">{player.answer}</td>
            <td className="player-status">
                {player.isAdmin ? <FaCrown/> : null}
                {player.isReady ? <GiCheckMark/> : null}
            </td>
        </tr>
    )
}
