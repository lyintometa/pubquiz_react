const Game = require('./Game')
const { randomString } = require('../util/helper')

class Room {
	constructor() {
		this.players = []
		this.id = randomString(4)
		this.game = new Game(this)
		console.log(`Room ${this.id} created`)
	}

	setAdmin() {
		if (this.admin && this.admin.connected) return
		this.admin = this.players.find(player => player.connected)
		if(!this.admin) return
		this.admin.socket.emit('set-admin')
	}

	addPlayer(player) {
		player.room = this
		this.players.push(player)
		player.connect()
	}

	hasPlayer(playerId) {
		return this.players.some(player => player.id == playerId)
	}

	getPlayer(playerId) {
		return this.players.find(player => player.id == playerId)
	}

	printPlayers() {
		const nameArray = []
		this.players.forEach(player => nameArray.push(player.name))
		console.log(`Room ${this.id}: ` + nameArray.join(','))
	}

}

module.exports = Room