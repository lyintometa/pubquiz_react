import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState()

    const hostName = 'http://192.168.178.89:5000'

    useEffect(() => {
        const newSocket = io(hostName)
        setSocket(newSocket)

        return () => newSocket.close()
    }, [])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}
