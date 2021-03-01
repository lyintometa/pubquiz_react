class Room {
	constructor() {
		this.players = []
		this.id = randomString(4)
		console.log(`Room ${this.id} created`)
	}

	addPlayer(player) {
		player.room = this
		this.players.push(player)
		player.connect()
	}

	hasPlayer(playerId) {
		return this.players.includes(player => (player.id == playerId))
	}

	getPlayer(playerId) {
		return this.players.find(player => (player.id == playerId))
	}
}

function randomString(length){
	const characters = 'abcdefghijklmnopqrstuvwxyz'//0123456789'
	let str = ""
	for (let i = 0; i < length; i++){
		str += characters[Math.floor(Math.random()*characters.length)]
	}
	return str
}

module.exports = Room