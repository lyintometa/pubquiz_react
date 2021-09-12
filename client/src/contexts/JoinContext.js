import React, { useContext, useEffect, useState } from 'react'
import { useSocket } from './SocketContext'
import { useLocalData } from './LocalDataContext'

const JoinContext = React.createContext()

export function useJoin() {
    return useContext(JoinContext)
}

export function JoinProvider({ children }) {
    const { socket } = useSocket()
    const { id, room, updateLocalData, setPage} = useLocalData()

    const [showReconnectModal, setShowReconnectModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const createRoom = (nameInput) => socket.emit('create-room', {playerName: nameInput})

    const joinRoom = (nameInput, roomInput) => socket.emit('join-request', {playerName: nameInput, roomId: roomInput})

    const reconnect = () => socket.emit('accept-reconnect')

    const closeReconnectModal = () => setShowReconnectModal(false)

    // reconnect
    useEffect(() => {
        if(!socket || !id || !room) return
        console.log(`'check-reconnect' {playerId: ${id}, roomId: ${room}}`)
        socket.emit('check-reconnect', {playerId: id, roomId: room})
        socket.on('reconnect-offer', ({ prevPlayerName }) => {
            setShowReconnectModal(true)
            //updateLocalData(prevPlayerName, id, room)
        })
        return () => socket.off('reconnect-offer')
    }, [socket])

    // join
    useEffect(() => {
        if(!socket) return
        socket.on('join-room', ({playerName, playerId, roomId}, callback) => {
            console.log(`'join-room' received {playerId: ${playerId}, roomdId: ${roomId}}`)
            if (errorMessage) setErrorMessage(null)
            updateLocalData(playerName, playerId, roomId)
            setPage("room")
            callback()
        })
        return () => socket.off('join-room')
    }, [socket])

    // join error
    useEffect(() => {
        if(!socket) return
        socket.on('join-room-error', ({message}) => {
            setErrorMessage(message)
        })
        return () => socket.off('join-room-error')
    }, [socket])

    const value = {
        createRoom,
        joinRoom,
        reconnect,
        showReconnectModal,
        closeReconnectModal,
        errorMessage
    }
   

    return (
        <JoinContext.Provider value={value}>
            {children}
        </JoinContext.Provider>
    )
}
