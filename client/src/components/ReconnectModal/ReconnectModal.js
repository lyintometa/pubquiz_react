import React from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../Modal/Modal'

import { EVENT_EMIT } from '../../constants/events'

import { emitSocketEvent } from '../../redux/modules/socket'

export default function ReconnectModal() {
    const dispatch = useDispatch()
    const reconnectPossible = useSelector(state => state.info.reconnectPossible)
    const reconnectName = useSelector(state => state.info.reconnectName)

    const [, setName] = useLocalStorage('name', "")
    const [room] = useLocalStorage('room', "")

    const closeModal = () => {}

    const handleAcceptReconnect = () => {
        dispatch(emitSocketEvent(EVENT_EMIT.INFO.ACCEPT_RECONNECT))
        setName(reconnectName)
        closeModal()
    }

    return (
        <Modal isOpen={reconnectPossible} closeModal={closeModal}>
                <p>Game still in progress. Would you like to reconnect as {reconnectName} to room {room}?</p>                
                <br/>
                <div className="modal-btn-container">
                    <button className="modal-btn" onClick={handleAcceptReconnect}>Yes</button>
                    <button className="modal-btn" onClick={closeModal}>No</button>
                </div>                
        </Modal>
    )
}
