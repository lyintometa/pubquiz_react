import { useContext, createContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'

const RoomContext = createContext()

export function useRoom() {
    return useContext(RoomContext)
}

export function RoomProvider({ children }) {
    const socket = useSocket()
    const [playersData, setPlayersData] = useState([])

    useEffect(() => {
        if(socket == null) return
        socket.on('add-player', newPlayerData => {
            setPlayersData(prevPlayers => {
                return [...prevPlayers, newPlayerData].sort((a, b) => {
                    return b.score - a.score
                })
            })
        })
        return () => socket.off('add-player')
    }, [socket])

    useEffect(() => {
        if(socket == null) return
        socket.on('remove-player', ({ id }) => {
            setPlayersData(prevPlayers => {
                return [...prevPlayers].filter(player => player.id !== id)
            })
        })
        return () => socket.off('add-player')
    }, [socket])


    const value = {
        playersData
    }

    return (
        <RoomContext.Provider value={value}>
            {children}
        </RoomContext.Provider>
    )
}
