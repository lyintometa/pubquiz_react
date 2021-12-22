import { v4 as uuidv4 } from 'uuid'

import QuestionFactory from '../factories/QuestionFactory.js'
import PlayerSocketEmitter from '../src/Socket/PlayerSocketEmitter.js'
import { EVENT_EMIT, EVENT_RECEIVED } from '../constants/events.js'
import SocketReceiver from '../src/Socket/SocketReceiver.js'

export default class Player {
	id = uuidv4()
	questions = []
	#questionFactory = new QuestionFactory()
	#canSubmitQuestions = true
	#score = 0
	#isConnected = true
	#isReady = false
	#isAdmin = false
	#answer = ''
	#roomId
	#emitter
	#receiver

	constructor(name, socket, roomId) {
		this.name = name
		this.#roomId = roomId
		this.#emitter = new PlayerSocketEmitter(socket, roomId)
		this.#receiver = new SocketReceiver(socket)
		this.connect()
		this.addSocketListeners()
	}

	addSocketListeners() {
		this.#receiver.on('disconnect', () => this.disconnect())
		this.#receiver.on(EVENT_RECEIVED.GAME.SUBMIT_QUESTION, questionData => this.addQuestion(questionData))
		/* this.socket.on('toggle-ready', () => this.isReady = !this.#isReady)
		this.socket.on('set-_answer', () => {})
		this.socket.on('continue-game', () => this.continueGame()) */
	}
	/* 
	socket.on('set-_answer', selectedOption => {
		if (!socket.room.game.questionInProgress) return
		socket.player.setAnswer(selectedOption)
	})
	*/

	connect = () => {
		this.#emitter.toSelf(EVENT_EMIT.ROOM.ACCEPT_JOIN, {playerName: this.name, playerId: this.id, roomId: this.#roomId})
		//this.updateCanSubmitQuestion()
		//this.room.game.updateGame()
	}

	emitOtherPlayers = (players) => {
		players.forEach(player => {
			if (!player.isConnected) return
			this.#emitter.toSelf(EVENT_EMIT.PLAYER.ADD, player.fullInfo)
		})
	}

	reconnect(socket){
		console.log("reconnect")
		this.#emitter.updateSocket(socket)
		this.#receiver.updateSocket(socket)
		this.isConnected = true
		this.connect()
		this.#emitter.toOthers(EVENT_EMIT.PLAYER.ADD, this.fullInfo)
	}

	addOnDisconnect = func => {
		this.#receiver.on('disconnect', func)
	}

	disconnect = () => {
		this.isConnected = false
		this.isReady = false
		this.isAdmin = false
		//this.room.game.updateGame()
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

	addQuestion = questionData => {
		if (!this.#canSubmitQuestions) return
		try {
			this.#questionFactory.createQuestion(questionData)
			this.updateCanSubmitQuestion
		} catch (error) {
			console.log(error) //return sth to client
		}
	}

	updateCanSubmitQuestion = () => {
		this.canSubmitQuestions = this.questions.length < this.room.game.numRounds
	}

	continueGame = () => {
		if (!this.#isAdmin) return
		this.room.game.continueGame()
	}

	increaseScore = () => {
		this._score = this.#score + 1
		this.sendToRoom('_score-update', this.#score)
	}

	//Getters

	get fullInfo() {
		return {
			id: this.id,
			name: this.name,
			score: this.#score,
			answer: this.#answer,
			isAdmin: this.#isAdmin,
			isReady: this.#isReady,
			isConnected: this.#isConnected
		}
	}

	get isConnected() { return this.#isConnected }
	get isReady() { return !this.#isConnected || this.#isReady }
	get isAdmin() { return this.#isConnected && this.#isAdmin }
	get canSubmitQuestions() { return this.#canSubmitQuestions}

	//Setters
	set isConnected(value) { this.updateFieldWithEvent('#isConnected', value) }
	set isAdmin(value) { this.updateFieldWithEvent('#isAdmin', value) }

	set isReady(value) {
		this.updateFieldWithEvent('#isReady', value)
		//this.room.game.updateGame() // remove after refactor
	}


	set canSubmitQuestions(value) { 
		if (value === this.#canSubmitQuestions) return
		this.#canSubmitQuestions = value
		this.socket.emit('questions-complete', value)
		if (this.#isAdmin) this.ready = true
	}

	updateFieldWithEvent = (field, value) => {
		if (this[field] === value) return
		this[field] = value
		const valueKey = field.replace('#', '')
		const eventName = EVENT_EMIT.PLAYER.UPDATE + capitalize(valueKey)
		this.#emitter.toAll(eventName, { id: this.id, [valueKey]: value })
	}
}

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)