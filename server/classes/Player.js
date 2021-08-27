const { v4: uuidv4 } = require('uuid');
const { InputQuestion, ChoiceQuestion, EstimationQuestion } = require('./Questions')

class Player {
	constructor(name, socket) {
		this.name = name
		this.id = uuidv4()

		this.socket = socket

		this.questions = []

		this.answers = []
		this.score = 0 // move inside answers[{}]

		this.isReady = false
	}

	sendFullInfo(){
		// return all vital information
	}

	connect() {
		this.socket.emit('join-room', {joinWorked: true, roomId: this.room.id, userId: this.id})
		this.connected = true
		this.socket.join(this.room.id)
		this.socket.player = this
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
		this.room.setAdmin()
	}

	reconnect(socket){
		console.log(`Player ${this.name} reconnected`)
		this.id = uuidv4()
		this.socket = socket
		this.connect()
	}

	disconnect() {
		console.log(`Player ${this.name} disconnected`)
		this.connected = false
		this.socket.to(this.room.id).emit('remove-player', {id: this.id})
		this.room.setAdmin()
	}

	setAnswer(answer) {
		const currentRound = this.room.game.currentRound
		const currentQuestion = this.room.game.currentQuestion
		if (this.answers.length <= currentRound) {
			this.answers.push([])
		}
		this.answers[currentRound][currentQuestion] = answer
		console.log(this.answers)
	}

	addQuestion(questionData) {
		console.log(`Player ${this.name} submitted a question`)
		if (this.questions.length >= this.room.game.numRounds) return
        switch(questionData.type){
            case "input":
				this.questions.push(new InputQuestion(questionData))
				break;
            case "choice":
				this.questions.push(new ChoiceQuestion(questionData))
				break;
            case "estimation":
				this.questions.push(new EstimationQuestion(questionData))
				break;
			default:
				console.log('undefined question type requested')
				break;
        }
		console.log (this.questions.length + " " + this.room.game.numRounds)
		if (this.questions.length == this.room.game.numRounds) {
			this.socket.emit('questions-complete', {id: this.id, complete: true})
		}
	}

	addScore(amount) {
		this.score = this.score + amount
		const data = {
			id: this.id,
			score: this.score
		}
		this.socket.to(this.room.id).emit('update-score', data)
        this.socket.emit('update-score', data)
		console.log(`Player ${this.name} new Score: ${this.score}`)
	}

	enoughQuestions(amount) {
		if (!this.connected) return true
		return this.questions.length >= amount
	}

	updateState(state){
		console.log(state)
		this.isReady = state
		this.socket.emit('update-state', {id: this.id, state})
		this.socket.to(this.room.id).emit('update-state', {id: this.id, state})
	}
}

module.exports = Player