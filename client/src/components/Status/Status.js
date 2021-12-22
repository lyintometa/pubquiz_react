import React from 'react'
import useValueListener from '../../../hooks/useValueListener'
import { useSocket } from '../../../contexts/SocketContext'
import { GiCheckMark } from 'react-icons/gi';
import { FaCrown } from 'react-icons/fa';
import './Status.css'

export default function Status({ playerId, initialIsAdmin, initialIsReady }) {
    const { socket } = useSocket()

    const isAdmin = useValueListener(socket, 'isAdmin', initialIsAdmin, playerId)
    const isReady = useValueListener(socket, 'isReady', initialIsReady, playerId)

    return (
        <td className="status">
            {isAdmin ? <FaCrown/> : null}
            {isReady ? <GiCheckMark/> : null}
        </td>
    )
}
