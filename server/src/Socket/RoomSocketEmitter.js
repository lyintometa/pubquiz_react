import SocketEmitter from "./SocketEmitter.js"

export default class RoomSocketEmitter extends SocketEmitter {

    constructor (socket, roomId) {
        super(socket, roomId)
    }

    toAll = (event, data) => {
        this.socket.to(this.roomId).emit(event, data)
        if (!SocketEmitter.loggingEnabled) return
        console.log(`Emitted socket event '${event} to all players:'`, data)
    }
}