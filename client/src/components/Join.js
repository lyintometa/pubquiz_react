import { useRef } from 'react'
import '../style/Join.css'
import { useJoin } from '../contexts/JoinProvider'
import ReconnectModal from './ReconnectModal'

export default function Join({ room }) {
    const usernameRef = useRef()
    const roomRef = useRef()
    const { joinRoom, showReconnectModal, closeReconnectModal, username } = useJoin()

    function handleSubmit(e) {
        e.preventDefault()
        joinRoom(usernameRef.current.value, roomRef.current.value)
    }

    return (
        <>
            <ReconnectModal showReconnectModal={showReconnectModal} closeReconnectModal={closeReconnectModal} joinRoom={joinRoom} username={username} room={room} />

            <div className="join-container">
                <form onSubmit={handleSubmit}>
                    <h1>Pubquiz</h1>
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
                    />
                    <br/>
                    <button type="submit">Join</button>
                </form>
            </div>
        </>
    )
}
