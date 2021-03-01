import { useContext, createContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'

const JoinContext = createContext()

export function useJoin() {
    return useContext(JoinContext)
}

export function JoinProvider({ id, setId, setInsideRoom, room, setRoom, children }) {
    const socket = useSocket()
    const [showReconnectModal, setShowReconnectModal] = useState(false)
    const [username, setUsername] = useState()

    function joinRoom(username, room, userId) {
        // catch empty strings / undefined values
        const roomId = room !== '' ? room : null 
        userId = userId ? userId : id
        socket.emit('join-request', {userId: userId, username: username, roomId: roomId})
    }

    useEffect(() => {
        if(socket == null) return
        socket.emit('check-reconnect', {id: id, roomId: room})
    }, [])

    useEffect(() => {
        if(socket == null) return
        socket.on('join-room', data => {
            if (!data.joinWorked) return //showerrormessage
            setRoom(data.roomId)
            setId(data.userId)
            setInsideRoom(true)
        })
        return () => socket.off('join-room')
    }, [socket])
    
    useEffect(() => {
        if(socket == null) return
        socket.on('reconnect-offer', username => {
            setShowReconnectModal(true)
            setUsername(username)
        })
        return () => socket.off('reconnect-offer')
    }, [socket])

    function closeReconnectModal() {
        setShowReconnectModal(false)
    }

    const value = {
        joinRoom,
        showReconnectModal,
        closeReconnectModal,
        username
    }
   

    return (
        <JoinContext.Provider value={value}>
            {children}
        </JoinContext.Provider>
    )
}
