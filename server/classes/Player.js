const { v4: uuidv4 } = require('uuid');

class Player {
	constructor(name, socket) {
		this.name = name
		this.id = uuidv4()
		this.score = 0
		this.socket = socket

		this.questions = []
		this.answers = []
	}

	connect() {
		this.socket.emit('join-room', {joinWorked: true, roomId: this.room.id, userId: this.id})
		this.connected = true
		this.socket.join(this.room.id)
		// add other players to this player:
		this.room.players.forEach(player => {
			if (!player.connected) return
			this.socket.emit('add-player', {
				score: player.score, 
				name: player.name, 
				id: player.id, 
				lastAnswer: player.answers.length ? player.answers[player.answers.length - 1] : null
			})
		})
		// add this player to all other players:
		this.socket.to(this.room.id).emit('add-player', {
			score: this.score,
			name: this.name,
			id: this.id,
			lastAnswer: this.answers.length ? this.answers[this.answers.length - 1] : null
		})
	}

	reconnect(socket){
		this.id = uuidv4()
		this.socket = socket
		this.connect()

	}

	disconnect() {
		this.connected = false
		this.socket.to(this.room.id).emit('remove-player', {id: this.id})
	}

	setAnswer(answer, round) {
		this.answers[round] = answer
	}

	addQuestion(question) {
		this.questions.push(question)
	}
}

module.exports = Player