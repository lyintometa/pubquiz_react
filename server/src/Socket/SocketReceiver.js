export default class SocketReceiver {

    static loggingEnabled = true
    
    #socket
    #listeners = {}

    constructor(socket) {
        this.#socket = socket
    }

    on = (event, listener) => {
        this.#socket.on(event, listener)
        if (this.#listeners[event] === undefined) {
            this.#listeners[event] = []
            this.#addLogger(event)
        }
        if (this.#listeners[event].includes(listener)) return
        this.#listeners[event].push(listener)
    }

    updateSocket = socket => {
        this.#socket.removeAllListeners()
        this.#socket = socket
        this.#updateListeners()
    }

    #updateListeners = () => {
        Object.keys(this.#listeners).forEach(event => {
            this.#listeners[event].forEach(listener => {
                this.#socket.on(event, listener)
            })
        })
    }

    #addLogger = event => {
        if (!SocketReceiver.loggingEnabled) return
        const logger = data => console.log(`Received socket event '${event}'`, data)
        this.#socket.on(event, data => logger(data))
        this.#listeners[event].push(logger)
    }
}