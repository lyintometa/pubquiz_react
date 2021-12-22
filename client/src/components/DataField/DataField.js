import React from 'react'
import useValueListener from '../../hooks/useValueListener'
import { useSocket } from '../../contexts/SocketContext'
import './DataField.css'

export default function DataField({ type, playerId, initialValue }) {
    const { socket } = useSocket

    const value = useValueListener(socket, type, initialValue, playerId)
    
    return (
        <td className={"data-field " + type}>
            {value}
        </td>
    )
}
