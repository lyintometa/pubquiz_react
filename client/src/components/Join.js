import React, { useEffect, useState } from 'react'
import { useJoin } from '../contexts/JoinContext'
import { useLocalData } from '../contexts/LocalDataContext'
import ReconnectModal from './ReconnectModal'
import '../stylesheets/Join.css'

export default function Join() {
    const { name } = useLocalData()
    const { createRoom, joinRoom, errorMessage } = useJoin()
    
    const [nameInput, setNameInput] = useState(name ? name : '')
    const [roomInput, setRoomInput] = useState('')
    const [roomInputEmpty, setRoomInputEmpty] = useState(true)

    const allowedSymbolsRoomInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    function handleSubmit(e) {
        e.preventDefault()
        if (roomInputEmpty) createRoom(nameInput)
        else joinRoom(nameInput, roomInput)
    }

    const handleRoomInputChange = event => {
        const newValue = event.target.value.toUpperCase()
        const newLength = newValue.length
        if (newLength === 0) {
            if (!roomInputEmpty) setRoomInputEmpty(true)
        } else {
            if (roomInputEmpty) setRoomInputEmpty(false)
            if (newLength > 4) return // too long
            if (allowedSymbolsRoomInput.indexOf(newValue[newLength - 1]) === -1) return // invalid char
        }
        setRoomInput(newValue)
    }

    return (
        <>
            <ReconnectModal/>

            <div className="join-container">
                <div className="logo-box">
                    <h1 className="logo"> Quarantäne <br/> Pubquiz</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="join-label" htmlFor="input-username">Username</label>
                    <br/>
                    <input
                        className="join-input"
                        type="text"
                        id="input-username"
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                        autoComplete="off"
                    />
                    <br/>
                    <label className="join-label" htmlFor="input-room">Room</label>
                    <br/>
                    <input
                        className="join-input"
                        type="text"
                        id="input-room"
                        value={roomInput}
                        autoComplete="off"
                        spellCheck="false"
                        onChange={e => handleRoomInputChange(e)}
                    />
                        {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
                    <br/>
                    <button className="submit-btn" type="submit">{roomInputEmpty ? "Create Room" : "Join Room"}</button>
                </form>
            </div>
        </>
    )
}
