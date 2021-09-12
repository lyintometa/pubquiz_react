import { useContext, createContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'
import useLocalStorage from '../hooks/useLocalStorage'

const JoinContext = createContext()

export function useJoin() {
    return useContext(JoinContext)
}

export function JoinProvider({ setInsideRoom, children }) {
    const socket = useSocket()
    const [id, setId] = useLocalStorage('id')
    const [room, setRoom] = useLocalStorage('room')
    const [showReconnectModal, setShowReconnectModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [username, setUsername] = useState()

    function joinRoom(username, room, userId) {
        // catch empty strings / undefined values
        const roomId = room !== '' ? room : null 
        userId = userId || id
        console.log('join-request sent')
        socket.emit('join-request', {userId: userId, username: username, roomId: roomId})
    }

    useEffect(() => {
        if(socket == null) return
        socket.emit('check-reconnect', {id: id, roomId: room})
    }, [])

    useEffect(() => {
        if(socket == null) return
        socket.on('join-room', data => {
            if (!data.joinWorked) {
                setErrorMessage("Room not found, if you want to create a new room leave the field empty.")
                return
            }
            setErrorMessage("")
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
        room,
        joinRoom,
        showReconnectModal,
        closeReconnectModal,
        username,
        errorMessage
    }
   

    return (
        <JoinContext.Provider value={value}>
            {children}
        </JoinContext.Provider>
    )
}
