import { EVENT_EMIT } from '../constants/events.js'
import RoomSocketEmitter from '../src/Socket/RoomSocketEmitter.js'
import Game from './Game.js'
import Player from './Player.js'

export default class Room {

	static usedIds = []

	players = []
	#emitter

	constructor(io) {
		this.id = Room.getUniqueRoomId()
		this.#emitter = new RoomSocketEmitter(io, this.id)

		this.game = new Game(this)

		console.log(`Room ${this.id} created`)
	}

	addNewPlayer = (name, socket) => {
		const newPlayer = new Player(name, socket, this.id)
		this.players.push(newPlayer)
		this.updateAdmin()
		this.#emitter.toAll(EVENT_EMIT.PLAYER.ADD, newPlayer.fullInfo)
		socket.join(this.id)
		newPlayer.emitOtherPlayers(this.players)
		newPlayer.addOnDisconnect(this.updateAdmin)
	}

	getPlayer = playerId => this.players.find(player => player.id === playerId)

	updateAdmin = () => {
		if (this.players.some(player => player.isAdmin)) return
		const connectedPlayer = this.players.find(player => player.isConnected)
		if(!connectedPlayer) return
		connectedPlayer.isAdmin = true
	}

	get isReady() { return !this.players.some(player => !player.isReady) }
	set isReady(value) { this.players.forEach(player => player.isReady = value) }

	static getUniqueRoomId = () => {
		const characters = 'abcdefghijklmnopqrstuvwxyz'
		let id = ""
		while (id.length === 0){
			for (let i = 0; i < 4; i++){
				id += characters[Math.floor(Math.random()*characters.length)]
			}
			if (Room.usedIds.includes(id)) id = ""
		}
		Room.usedIds.push(id)
		return id
	}
}