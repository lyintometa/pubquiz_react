const { v4: uuidv4 } = require('uuid');
const { InputQuestion, ChoiceQuestion, EstimationQuestion } = require('./Questions')

class Player {
	constructor(_name, socket) {
		this.id = uuidv4()
		this.socket = socket

		this.questions = []

		this._score = 0
		this._name = _name
		this._answer = ''

		this._isConnected = true
		this._isReady = false
		this._isAdmin = false
	}

	addSocketListeners() {
		this.socket.on('disconnect', () => this.disconnect())
		this.socket.on('toggle-ready', () => this.isReady = !this._isReady)
		this.socket.on('add-question', questionData => this.addQuestion(questionData))
		this.socket.on('set-_answer', () => {})
		this.socket.on('continue-game', () => this.continueGame())
		//Socket getters
		/* this.socket.on('get-score', (callback) => callback({score: this._score}))
		this.socket.on('get-name', (callback) => callback({name: this._name}))
		this.socket.on('get-answer', (callback) => callback({answer: this._answer}))
		this.socket.on('get-isReady', (callback) => callback({isReady: this._isReady})) */
		this.socket.on('get-isAdmin', callback => callback({isAdmin: this._isAdmin}))
	}
	/* 
	socket.on('set-_answer', selectedOption => {
		if (!socket.room.game.questionInProgress) return
		socket.player.setAnswer(selectedOption)
	})
	*/

	fullInfo(){
		return {
			id: this.id,
			name: this._name,
			score: this._score,
			answer: this._answer,
			isAdmin: this._isAdmin,
			isReady: this._isReady,
			playerState: this._isAdmin ? "admin" : this._isReady ? "ready" : "notReady" //remove when refactored
		}
	}

	updatePlayer(){
		this.socket.emit('update-player', this.fullInfo())
		this.socket.to(this.room.id).emit('update-player', this.fullInfo())
	}

	addToRoom = roomId => {
		return 
	}

	connect = async () => {
		const clientUpdateView = new Promise(resolve => 
			this.socket.emit('join-room', {playerName: this._name, playerId: this.id, roomId: this.room.id}, resolve))
		
		this.addSocketListeners()
		this._isConnected = true
		this.socket.join(this.room.id)
		await clientUpdateView
		this.room.updateAdmin()
	
		this.checkQuestionAmount()

		// add other players to this player
		this.room.players.forEach(player => {
			if (!player._isConnected) return
			this.socket.emit('add-player', player.fullInfo())
		})

		// add this player to all other players
		this.socket.to(this.room.id).emit('add-player', this.fullInfo())

		this.room.game.updateGame()
	}

	reconnect(socket){
		console.log("reconnect")
		this.socket = socket
		this.connect()
	}

	disconnect() {
		this._isConnected = false
		this.ready = false
		this._isAdmin = false
		console.log(this.socket)
		console.log(this.room.id)
		console.log(this.id)
		if (!this.socket || !this.room || !this.id) return
		this.socket.to(this.room.id).emit('remove-player', {id: this.id})

		this.room.updateAdmin()
		this.room.game.updateGame()
	}

	/* setAnswer(_answer) {
		const currentRound = this.room.game.currentRound
		const currentQuestion = this.room.game.currentQuestion
		if (this.answers.length <= currentRound) {
			this.answers.push([])
		}
		this.answers[currentRound][currentQuestion] = _answer
		console.log(this.answers)
	} */

	addQuestion(questionData) {
		console.log(`Player ${this._name} submitted a question`)
		if (this.questions.length >= this.room.game.numRounds) return
        switch(questionData.type){
            case "input":
				this.questions.push(new InputQuestion(questionData, this.id))
				break;
            case "choice":
				this.questions.push(new ChoiceQuestion(questionData, this.id))
				break;
            case "estimation":
				this.questions.push(new EstimationQuestion(questionData, this.id))
				break;
			default:
				console.log('undefined question type requested')
				break;
        }
		this.checkQuestionAmount()
	}

	checkQuestionAmount(){
		if (this.questions.length >= this.room.game.numRounds) {
			this.socket.emit('questions-complete')
			if (this._isAdmin) this.ready = true
		}
	}

	continueGame = () => {
		if (!this._isAdmin) return
		this.room.game.continueGame()		
	}

	/* addScore(amount) {
		console.log(`Player ${this._name} new Score: ${this._score}`)
		this._score = this._score + amount
		this.updatePlayer()
	} */

	increaseScore = () => {
		this._score = this._score + 1
		this.sendToRoom('_score-update', this._score)
	}

	//Getters
	get isConnected() { return this._isConnected }
	get isReady() { return !this._isConnected || this._isReady }
	get isAdmin() { return this._isConnected && this._isAdmin }

	//Setters
	set isConnected(value) { this.updateFieldWithEvent('_isConnected', value, 'isConnected-update') }
	set isReady(value) {
		this.updateFieldWithEvent('_isReady', value, 'isReady-update')
		this.room.game.updateGame() // remove after refactor
	}
	set isAdmin(value) { this.updateFieldWithEvent('_isAdmin', value, 'isAdmin-update')	}

	updateFieldWithEvent = (field, value, eventName) => {
		this[field] = value
		const data = {id: this.id}
		data[field.substring(1)] = value
		this.room.socket.emit(eventName, data)
		console.log(`'${eventName}' sent: {id: ${this.id}, ${field.substring(1)}: ${value}}`)
	}

	sendToRoom = (event, data) => this.room.socket.emit(event, data)


}

module.exports = Player