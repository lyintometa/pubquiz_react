import { useRef, useState } from 'react'
import '../stylesheets/Join.css'
import { useJoin } from '../contexts/JoinProvider'
import ReconnectModal from './ReconnectModal'

export default function Join() {
    const usernameRef = useRef()
    const roomRef = useRef('')
    const { room, joinRoom, showReconnectModal, closeReconnectModal, username, errorMessage } = useJoin()
    const [btnText, setBtnText] = useState('Create Room')

    const allowedSymbolsRoomInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    function handleSubmit(e) {
        e.preventDefault()
        joinRoom(usernameRef.current.value, roomRef.current.value)
    }

    function handleRoomInputChange(){
        roomRef.current.value = roomRef.current.value.toUpperCase()
        const newLength = roomRef.current.value.length
        if (allowedSymbolsRoomInput.indexOf(roomRef.current.value[newLength-1]) == -1) roomRef.current.value = roomRef.current.value.slice(0, newLength - 1)
        if (roomRef.current.value === '') {
            if (btnText !== 'Create Room') setBtnText('Create Room')
            return 
        }
        roomRef.current.value = roomRef.current.value.slice(0, 4)
        if (btnText !== 'Join Room') setBtnText('Join Room')
    }

    const rejoin = () => joinRoom(username, room)

    return (
        <>
            <ReconnectModal showReconnectModal={showReconnectModal} closeReconnectModal={closeReconnectModal} rejoin={rejoin} username={username} room={room} />

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
                        ref={usernameRef}
                        autoComplete="off"
                        required
                    />
                    <br/>
                    <label className="join-label" htmlFor="input-room">Room</label>
                    <br/>
                    <input
                        className="join-input"
                        type="text"
                        id="input-room"
                        ref={roomRef}
                        autoComplete="off"
                        onChange={() => handleRoomInputChange()}
                    />
                        {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
                    <br/>
                    <button className="submit-btn" type="submit">{btnText}</button>
                </form>
            </div>
        </>
    )
}
