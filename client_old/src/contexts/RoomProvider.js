import { useContext, createContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'

const RoomContext = createContext()

export function useRoom() {
    return useContext(RoomContext)
}

export function RoomProvider({ setIsAdmin, children }) {
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
        socket.on('update-score', scoreData => {
            setPlayersData(prevPlayers => {
                const playerToUpdate = prevPlayers.find(player => player.id === scoreData.id)
                playerToUpdate.score = scoreData.score
                const otherPlayersData = prevPlayers.filter(player => player.id !== scoreData.id)
                return [...otherPlayersData, playerToUpdate].sort((a, b) => {
                    return b.score - a.score
                })
            })
        })
        return () => socket.off('update-score')
    }, [socket])

    useEffect(() => {
        if(socket == null) return
        socket.on('remove-player', ({ id }) => {
            setPlayersData(prevPlayers => {
                return [...prevPlayers].filter(player => player.id !== id)
            })
        })
        return () => socket.off('remove-player')
    }, [socket])

    
    useEffect(() => {
        if(socket == null) return
        socket.on('set-admin', () => setIsAdmin(true))
        return () => socket.off('set-admin')
    }, [socket])

    useEffect(() => {
        if(socket == null) return
        socket.on('update-state', stateData => {
            setPlayersData(prevPlayers => {
                console.log(stateData)
                const players = [...prevPlayers]
                const playerToUpdate = players.find(player => player.id === stateData.id)
                playerToUpdate.state = stateData.state
                console.log(playerToUpdate)
                return players
            })
        })
        console.log(playersData)
        return () => socket.off('update-state')
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
