import React from 'react'
import { useLocalData } from '../contexts/LocalDataContext'
import '../stylesheets/Header.css'

export default function Header() {
    const { room } = useLocalData()

    const roomId = room ? room.toUpperCase() : null

    return (
        <div className="header-bar">
            <span className="header-title">Quarantäne Pubquiz</span>
            <span className="header-room">room ID: {roomId}</span>
        </div>
    )
}
