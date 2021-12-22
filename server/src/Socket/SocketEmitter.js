export default class SocketEmitter {

    static loggingEnabled = true
    
    socket
    roomId

    constructor (socket, roomId) {
        this.socket = socket
        this.roomId = roomId
    }

    updateSocket = socket => {
        this.socket = socket
    }
}