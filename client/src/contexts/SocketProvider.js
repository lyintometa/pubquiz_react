import { useContext, createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ id, roomId, children }) {
    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',
            { query: { userId: id, roomId } }
        )
        setSocket(newSocket)

        return () => newSocket.close()
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
