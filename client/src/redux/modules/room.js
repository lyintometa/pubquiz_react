import { createReducer } from '@reduxjs/toolkit'

export const ROOM = {
    ACCEPT_JOIN: 'room/acceptJoin',
    REJECT_JOIN: 'room/rejectJoin'
}

const initialState = {
    id: ""
}

const roomReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(ROOM.ACCEPT_JOIN, (state, action) => {
            state.id = action.payload.roomId
        })
})

export default roomReducer

export const acceptJoin = data => ({ type: ROOM.ACCEPT_JOIN, payload: { data } })
export const rejectJoin = data => ({ type: ROOM.REJECT_JOIN, payload: { data } })