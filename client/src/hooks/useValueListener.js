import { useState, useEffect } from 'react'

export default function useLocalStorage(socket, type, initialValue, id, log) {
    
    const [value, setValue] = useState(() => {        
        if (typeof initialValue === 'function') return
        return initialValue
    })
    
    useEffect(() => {
        const fetchValue = async () => {
            if (typeof initialValue !== 'function') return
            setValue(await initialValue())
        }
        fetchValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!log) return
        console.log(type + " changed to ", value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    //Listen for value change
    useEffect(() => {
        if (!socket) return
        const handleUpdate = data => {
            if (id && data.id !== id) return
            if (log) console.log(`'${type}-update' received`, data)
            setValue(data[type])
        }
        socket.on(`${type}-update`, handleUpdate)
        return () => socket.off(`${type}-update`, handleUpdate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    return value
}
