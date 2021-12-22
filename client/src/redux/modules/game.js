import { createReducer } from '@reduxjs/toolkit'
import { GAME_STATE } from '../../constants/gameStates'

export const INFO = {
    OFFER_RECONNECT: 'info/offerReconnect',
    CLEAR_JOIN_ERROR_MESSAGE: 'info/clearJoinErrorMessage'
}

const initialState = {
    gameState: GAME_STATE.NOT_STARTED
}

const gameReducer = createReducer(initialState, (builder) => {
    //builder
        /* .addCase(INFO.OFFER_RECONNECT, (state, action) => {
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
        }) */
})

export default gameReducer

/* export const offerReconnect = data => ({ type: INFO.OFFER_RECONNECT, payload: { data } })
export const clearJoinErrorMessage = () => ({ type: INFO.CLEAR_JOIN_ERROR_MESSAGE }) */