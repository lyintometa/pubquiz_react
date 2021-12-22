import SocketEmitter from "./SocketEmitter.js"

export default class PlayerSocketEmitter extends SocketEmitter {

    constructor (socket, roomId) {
        super(socket, roomId)
    }

    toSelf = (event, data) => {        
        this.socket.emit(event, data)
        if (!SocketEmitter.loggingEnabled) return
        console.log(`Emitted socket event '${event} to player:'`, data)
    }

    toOthers = (event, data) => {
        this.socket.to(this.roomId).emit(event, data)
        if (!SocketEmitter.loggingEnabled) return
        console.log(`Emitted socket event '${event} to other players:'`, data)
    }

    toAll = (event, data) => {
        this.socket.emit(event, data)
        this.socket.to(this.roomId).emit(event, data)
        if (!SocketEmitter.loggingEnabled) return
        console.log(`Emitted socket event '${event} to all players:'`, data)
    }
}