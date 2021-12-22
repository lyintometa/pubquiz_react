import { createReducer } from '@reduxjs/toolkit'
import { ROOM } from './room'

export const INFO = {
    OFFER_RECONNECT: 'info/offerReconnect',
    CLEAR_JOIN_ERROR_MESSAGE: 'info/clearJoinErrorMessage'
}

const initialState = {
    id: '',
    name: '',
    reconnectPossible: false,
    reconnectName: '',
    joinErrorMessage: ''
}

const infoReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(INFO.OFFER_RECONNECT, (state, action) => {
            state.reconnectName = action.data.prevPlayerName
            state.reconnectPossible = true
        })
        .addCase(ROOM.ACCEPT_JOIN, (state, action) => {
            state.id = action.payload.playerId
        })
        .addCase(ROOM.REJECT_JOIN, (state, action) => {
            state.joinErrorMessage = action.payload.message
        })
        .addCase(INFO.CLEAR_JOIN_ERROR_MESSAGE, (state, action) => {
            state.joinErrorMessage = ''
        })
})

export default infoReducer

export const offerReconnect = data => ({ type: INFO.OFFER_RECONNECT, payload: { data } })
export const clearJoinErrorMessage = () => ({ type: INFO.CLEAR_JOIN_ERROR_MESSAGE })