const INFO_EVENT_EMIT = {
    OFFER_RECONNECT: "info/offerReconnect"
}

const ROOM_EVENT_EMIT = {
    ACCEPT_JOIN: "room/acceptJoin",
    REJECT_JOIN: "room/rejectJoin"
}

const PLAYER_EVENT_EMIT = {
    ADD: "player/add",
    UPDATE: "player/update"
}

export const EVENT_EMIT = {
    INFO: INFO_EVENT_EMIT,
    ROOM: ROOM_EVENT_EMIT,
    PLAYER: PLAYER_EVENT_EMIT
}

const GAME_EVENT_REVEICED = {
    SUBMIT_QUESTION: "game/submitQuestion"
}

const INFO_EVENT_RECEIVED = {    
    REQUEST_RECONNECT: "info/requestReconnect"
}

const ROOM_EVENT_RECEIVED = {
    JOIN: "room/join",
    CREATE: "room/create"
}

export const EVENT_RECEIVED = {
    GAME: GAME_EVENT_REVEICED,
    INFO: INFO_EVENT_RECEIVED,
    ROOM: ROOM_EVENT_RECEIVED
}