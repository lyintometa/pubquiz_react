import React, { useEffect, useState, useContext } from 'react'
import { useSocket } from './SocketContext'

const RoomDataContext = React.createContext()

export function useRoomData() {
    return useContext(RoomDataContext)
}

export function RoomDataProvider({ children }) {
    const { socket } = useSocket()

    const [adminPlayerId, setAdminPlayerId] = useState()

    useEffect(() => {
        if(!socket) return
        socket.on('set-admin', ({adminId}) => {
            console.log(`'set-admin' received: {adminId: ${adminId}}`)
            if(adminPlayerId !== adminId) setAdminPlayerId(adminId)
        })
        return () => socket.off('set-admin')
    }, [socket])
    
    const value = {
        adminPlayerId
    }

    return (
        <RoomDataContext.Provider value={value}>
            {children}
        </RoomDataContext.Provider>
    )
}
