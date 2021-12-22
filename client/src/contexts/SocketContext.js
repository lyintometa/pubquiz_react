import React, { useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'

import { HOST_NAME } from '../constants/connection'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ children }) {

    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io(HOST_NAME)
        setSocket(newSocket)
        return () => newSocket.close()
    }, [])

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}