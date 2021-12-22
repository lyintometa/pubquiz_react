import React, { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useDispatch, useSelector } from 'react-redux'

import ReconnectModal from '../ReconnectModal/ReconnectModal'

import { EVENT_EMIT } from '../../constants/events'

import { emitSocketEvent } from '../../redux/modules/socket'
import { clearJoinErrorMessage } from '../../redux/modules/info'

import './JoinPage.css'

const allowedSymbolsRoomInput = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function JoinPage() {
    const dispatch = useDispatch()
    const errorMessage = useSelector(state => state.info.joinErrorMessage)

    const [name, setName] = useLocalStorage('name', '')
    const [id, setId] = useLocalStorage('id', '')
    const [room, setRoom] = useLocalStorage('room', '')

    const [showReconnectModal, setShowReconnectModal] = useState(false)
    const [nameInput, setNameInput] = useState(name ? name : '')
    const [roomInput, setRoomInput] = useState('')
    const [prevPlayerName, setPrevPlayerName] = useState('')

    const closeReconnectModal = () => setShowReconnectModal(false)

    useEffect(() => {
        if(!id || !room) return
        //console.log(`'check-reconnect' {playerId: ${id}, roomId: ${room}}`)
        dispatch(emitSocketEvent(EVENT_EMIT.ROOM.REQUEST_RECONNECT, {playerId: id, roomId: room}))
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()
        if (roomInput.length === 0) dispatch(emitSocketEvent(EVENT_EMIT.ROOM.CREATE, {playerName: nameInput}))
        else dispatch(emitSocketEvent(EVENT_EMIT.ROOM.JOIN, {playerName: nameInput, roomId: roomInput}))
    }

    const handleRoomInputChange = e => {
        const newValue = e.target.value.toUpperCase()
        const newLength = newValue.length
        if (newLength > 4 || !containsOnlyAllowedChars(newValue)) return
        setRoomInput(newValue)
        dispatch(clearJoinErrorMessage())
    }

    return (
        <>
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
                    <button className="submit-btn" type="submit">{roomInput.length === 0 ? "Create Room" : "Join Room"}</button>
                </form>
            </div>
            <ReconnectModal showModal={showReconnectModal} closeModal={closeReconnectModal} prevName={prevPlayerName}/>
        </>
    )
}

const containsOnlyAllowedChars = text => {
    for (let i = 0; i < text.length; i++) {
        if (!allowedSymbolsRoomInput.includes(text[i])) return false
    }
    return true
}