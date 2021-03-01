import React from 'react'
import Modal from './Modal'

export default function ReconnectModal({ showReconnectModal, closeReconnectModal, joinRoom, username, room }) {
    return (
        <Modal isOpen={showReconnectModal} closeModal={closeReconnectModal}>
                <p>Game still in progress. Would you like to reconnect as {username} to room {room}?</p>                
                <br/>
                <button onClick={() => {joinRoom(username, room); closeReconnectModal()}}>Yes</button>
                <button onClick={() => closeReconnectModal()}>No</button>
        </Modal>
    )
}
