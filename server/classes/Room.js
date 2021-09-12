const Game = require('./Game')
const { randomString } = require('../util/helper')

class Room {
	constructor(io) {
		this.players = []
		this.id = randomString(4)
		this.socket = io.to(this.id)
		this.game = new Game(this)

		console.log(`Room ${this.id} created`)
	}

	/* reconnectPlayer = async (socket, playerId) => {
		const player = this.getPlayer(playerId)
		await player.addToRoom(this.id)
		this.updateAdmin()
		player.reconnect(socket)
	} */

	addPlayer = async player => {
		await player.addToRoom(this.id)
		player.room = this
		this.players.push(player)
		this.updateAdmin()
		player.getOtherPlayer = this.getPlayer
		player.connect()
	}

	getPlayer = (playerId) => this.players.find(player => player.id == playerId)

	updateAdmin() {
		if (this.players.some(player => player.isAdmin)) return
		const connectedPlayer = this.players.find(player => player.isConnected)
		if(!connectedPlayer) return
		connectedPlayer.isAdmin = true
		this.socket.emit('set-admin', {adminId: connectedPlayer.id}) // remove after refactor
	}

	get isReady() { return !this.players.some(player => !player.isReady) }
	set isReady(value) { this.players.forEach(player => player.isReady = value) }
}

module.exports = Room