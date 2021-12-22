import { createReducer } from '@reduxjs/toolkit'

export const PLAYERS = {
    ADD: 'players/add',
    UPDATE_SCORE: "players/updateScore",
    UPDATE_IS_ADMIN: "players/updateIsAdmin",
    UPDATE_IS_CONNECTED: "players/updateIsConnected"
}

const initialState = {
    allIds: [],
    byId: {}
}

const playersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(PLAYERS.ADD, (state, action) => {
            console.log(action)
            const newId = action.payload.id
            if (state.allIds.includes(newId)) return
            state.byId[newId] = action.payload
            state.allIds = sortByScore([...state.allIds, newId], state.byId)
        })
        .addCase(PLAYERS.UPDATE_SCORE, (state, action) => {
            console.log(action)
            const id = action.payload.playerData.playerId
            if (!state.allIds.includes(id)) return
            state.byId[id].score = action.payload.score
            state.allIds = sortByScore(state.allIds, state.byId)
        })
        .addCase(PLAYERS.UPDATE_IS_ADMIN, (state, action) => {
            console.log(action)
            const id = action.payload.id
            if (!state.allIds.includes(id)) return
            state.byId[id].isAdmin = action.payload.isAdmin
        })
        .addCase(PLAYERS.UPDATE_IS_CONNECTED, (state, action) => {
            console.log(action)
            const id = action.payload.id
            if (!state.allIds.includes(id)) return
            state.byId[id].isConnected = action.payload.isConnected
        })
})

export default playersReducer

const sortByScore = (allIds, byId) => allIds.map(id => byId[id]).sort((a, b) =>  b.score - a.score).map(player => player.id)