import { createReducer } from '@reduxjs/toolkit'

const SOCKET_CONNECTED = 'socket/connected'
const SOCKET_DISCONNECTED = 'socket/disconnected'
export const SOCKET_EMIT_EVENT = 'socket/dispatchEvent'

const initialState = {
    connected: false
}

const socketReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(SOCKET_CONNECTED, (state, action) => {
            state.connected = true
        })
        .addCase(SOCKET_DISCONNECTED, (state, action) => {
            state.connected = false
        })
})

export default socketReducer

export const socketConnected = () => ({ type: SOCKET_CONNECTED })
export const socketDisconnected = () => ({ type: SOCKET_DISCONNECTED })
export const emitSocketEvent = (eventName, data) => ({ type: SOCKET_EMIT_EVENT, payload: { eventName, data } })