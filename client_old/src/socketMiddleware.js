import io from 'socket.io-client'
import { SOCKET_CONNECT, SOCKET_ADD_EVENT_LISTENER, SOCKET_REMOVE_EVENT_LISTENERS, SOCKET_EMIT_EVENT } from "../modules/socket"
import { HOST_NAME } from "../../constants/connection"
import { EVENT } from '../../constants/events'

const socketMiddleware = () => {
    return store => {
        const socket = io(HOST_NAME)
        console.log(socket)
        socket.onAny((eventName, ...args) => {
            console.log(eventName)
            console.log(args)
        })

        return next => action => {
            console.log(socket)

            const onEvent = (callbackAction) => {
                return data => {
                    console.log(data)
                    store.dispatch(callbackAction(data))
                }
            }

            switch (action.type) {
                /* case SOCKET_CONNECT:
                    if (socket && socket.connected) break;
                    socket = action.payload.socket
                    break; */

                case SOCKET_ADD_EVENT_LISTENER:
                    const eventNameToAdd = action.payload.eventName
                    socket.removeAllListeners(eventNameToAdd)
                    const callback = onEvent(action.payload.callbackAction)
                    socket.on(eventNameToAdd, callback)
                    console.log(`Added listener for event '${eventNameToAdd}'`)
                    break;

                case SOCKET_REMOVE_EVENT_LISTENERS:
                    const eventNameToRem = action.payload.eventName
                    socket.removeAllListeners(eventNameToRem)
                    console.log(`Removed all listener for event '${eventNameToRem}'`)
                    break;

                case SOCKET_EMIT_EVENT:
                    const eventNameToEmit = action.payload.eventName
                    const data = action.payload.data
                    socket.emit(eventNameToEmit, data)
                    console.log(`Emitted event '${eventNameToEmit}':`, data)
                    break;

                default:
                    return next(action);
            }
        }
    }
}

export default socketMiddleware