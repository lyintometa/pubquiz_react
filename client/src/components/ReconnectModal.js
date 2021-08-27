import React from 'react'
import Modal from './Modal'

export default function ReconnectModal({ showReconnectModal, closeReconnectModal, joinRoom, username, room }) {
    return (
        <Modal isOpen={showReconnectModal} closeModal={closeReconnectModal}>
                <p>Game still in progress. Would you like to reconnect as {username} to room {room}?</p>                
                <br/>
                <div className="modal-btn-container">
                    <button className="modal-btn" onClick={() => {joinRoom(username, room); closeReconnectModal()}}>Yes</button>
                    <button className="modal-btn" onClick={() => closeReconnectModal()}>No</button>
                </div>
                
        </Modal>
    )
}
