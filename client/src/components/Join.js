import { useRef, useState } from 'react'
import '../stylesheets/Join.css'
import { useJoin } from '../contexts/JoinProvider'
import ReconnectModal from './ReconnectModal'

export default function Join({ room }) {
    const usernameRef = useRef()
    const roomRef = useRef('')
    const { joinRoom, showReconnectModal, closeReconnectModal, username, errorMessage } = useJoin()
    const [btnText, setBtnText] = useState('Create Room')

    function handleSubmit(e) {
        e.preventDefault()
        joinRoom(usernameRef.current.value, roomRef.current.value)
    }

    function updateButtonText(){
        if (roomRef.current.value === '') return setBtnText('Create Room')
        roomRef.current.value = roomRef.current.value.slice(0, 4)
        setBtnText('Join Room')
    }

    return (
        <>
            <ReconnectModal showReconnectModal={showReconnectModal} closeReconnectModal={closeReconnectModal} joinRoom={joinRoom} username={username} room={room} />

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
                        onChange={() => updateButtonText()}
                    />
                        {errorMessage ? <span className="error-message">{errorMessage}</span> : null}
                    <br/>
                    <button className="submit-btn" type="submit">{btnText}</button>
                </form>
            </div>
        </>
    )
}
