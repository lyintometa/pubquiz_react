import io from 'socket.io-client'
import { SOCKET_EMIT_EVENT, socketConnected, socketDisconnected } from "../modules/socket"
import { HOST_NAME } from "../../constants/connection"
import { EVENT_RECEIVED } from '../../constants/events'

const socketMiddleware = () => store => {

    const socket = io(HOST_NAME)
    socket.on("connect", () => store.dispatch(socketConnected()))
    socket.on("disconnect", () => store.dispatch(socketDisconnected()))
    socket.onAny((eventName, data, ..._) => {
        console.log(`Reveiced socket event '${eventName}':`, data)
        const type = EVENT_RECEIVED[eventName]
        if (type === undefined) console.warn(`Socket event '${eventName}' not recognized, no action dispatched.`)
        else store.dispatch({ type: type, payload: data})
    })

    return next => action => {
        switch (action.type) {
            case SOCKET_EMIT_EVENT:
                const eventNameToEmit = action.payload.eventName
                const data = action.payload.data
                socket.emit(eventNameToEmit, data)
                console.log(`Emitted socket event '${eventNameToEmit}':`, data)
                break;

            default:
                return next(action);
        }
    }
}

export default socketMiddleware