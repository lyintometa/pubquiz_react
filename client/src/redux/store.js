import { configureStore } from "@reduxjs/toolkit";
import socketMiddleware from "./middlewares/socketMiddleware";
import gameReducer from "./modules/game";
import infoReducer from "./modules/info";
import playersReducer from "./modules/players";
import roomReducer from "./modules/room";
import socketReducer from "./modules/socket";

export const store = configureStore({
    reducer: {
        game: gameReducer,
        info: infoReducer,
        players: playersReducer,
        room: roomReducer,
        socket: socketReducer
    },
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({
        serializableCheck: false
      }), socketMiddleware()]
})