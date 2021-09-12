import React from 'react'
import DataField from './DataField/DataField'
import Status from './Status/Status'
import { useLocalData } from '../../../../contexts/LocalDataContext'
import './Player.css'

export default function Player({ player }) {
    const { id } = useLocalData()

    return (
        <tr className={player.id === id ? "player self" : "player"}>
            <DataField type="score" playerId={player.id} initialValue={player.score}/>
            <DataField type="name" playerId={player.id} initialValue={player.name}/>
            <DataField type="answer" playerId={player.id} initialValue={player.answer}/>
            <Status playerId={player.id} initialIsAdmin={player.isAdmin} initialIsReady={player.isReady}/>
        </tr>
    )
}
