import React, { useState, useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const LocalDataContext = React.createContext()

export function useLocalData() {
    return useContext(LocalDataContext)
}

export function LocalDataProvider({ children }) {
    const [page, setPage] = useState("join")
    const [localData, setLocalData] = useLocalStorage('localData', () => ({name: undefined, id: undefined, room: undefined}))

    const name = localData.name
    const id = localData.id
    const room = localData.room

    const updateLocalData = (newName, newId, newRoom) => {
        if (name === newName && id === newId && room === newRoom) return
        setLocalData({
            name: newName,
            id: newId,
            room: newRoom            
        })
    }

    const value = {
        name,
        id, 
        room,
        localData,
        updateLocalData,
        page,
        setPage
    }

    return (
        <LocalDataContext.Provider value={value}>
            {children}
        </LocalDataContext.Provider>
    )
}
