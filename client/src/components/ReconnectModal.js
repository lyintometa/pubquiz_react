import React from 'react'
import Modal from './Modal'
import { useLocalData } from '../contexts/LocalDataContext'
import { useJoin } from '../contexts/JoinContext'


export default function ReconnectModal() {
    const { name, room} = useLocalData()
    const { reconnect, showReconnectModal, closeReconnectModal} = useJoin()

    const handleReconnectClick = () => {
        reconnect()
        closeReconnectModal()
    }

    return (
        <Modal isOpen={showReconnectModal} closeModal={closeReconnectModal}>
                <p>Game still in progress. Would you like to reconnect as {name} to room {room}?</p>                
                <br/>
                <div className="modal-btn-container">
                    <button className="modal-btn" onClick={() => handleReconnectClick()}>Yes</button>
                    <button className="modal-btn" onClick={() => closeReconnectModal()}>No</button>
                </div>
                
        </Modal>
    )
}
