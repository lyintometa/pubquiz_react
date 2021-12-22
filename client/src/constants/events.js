import { PLAYERS } from "../redux/modules/players"
import { INFO } from "../redux/modules/info"
import { ROOM } from "../redux/modules/room"

const SOCKET_EVENTS = {
    CONNECT: "connect",
    DISCONNECT: "disconnect"
}

const ROOM_EVENTS_EMIT = {
    JOIN: "room/join",
    CREATE: "room/create"
}

const INFO_EVENTS_EMIT = {
    REQUEST_RECONNECT: "info/requestReconnect",
    ACCEPT_RECONNECT: "info/acceptReconnect"
}

const GAME_EVENTS_EMIT = {
    SUBMIT_QUESTION: "game/submitQuestion"
}

export const EVENT_EMIT = {
    GAME: GAME_EVENTS_EMIT,
    INFO: INFO_EVENTS_EMIT,
    SOCKET: SOCKET_EVENTS,
    ROOM: ROOM_EVENTS_EMIT,
}

export const EVENT_RECEIVED = {
    "info/offerReconnect": INFO.OFFER_RECONNECT,
    "room/acceptJoin": ROOM.ACCEPT_JOIN,
    "room/rejectJoin": ROOM.REJECT_JOIN,
    "player/add": PLAYERS.ADD,
    "player/updateScore": PLAYERS.UPDATE_SCORE,
    "player/updateIsReady": PLAYERS.UPDATE_IS_READY,
    "player/updateIsAdmin": PLAYERS.UPDATE_IS_ADMIN,
    "player/updateIsConnected": PLAYERS.UPDATE_IS_CONNECTED
}