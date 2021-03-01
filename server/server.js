const Player = require('./classes/Player')
const Room = require('./classes/Room')
const io = require('socket.io')(5000, {cors: {
	origin: "http://localhost:3000",
	methods: ["GET", "POST"]
}})


io.on('connection', socket => {
	// undo the stringification of undefined:
	const userId = socket.handshake.query.userId === 'undefined' ? undefined : socket.handshake.query.userId
	const lastRoom = socket.handshake.query.roomId === 'undefined' ? undefined : socket.handshake.query.roomId
	if (userId && lastRoom) {
		//console.log(`ID ${userId} reconnected (was room: ${lastRoom})`)
		const room = rooms.find(room => (room.id == lastRoom))
		if(room){
			//console.log('offering reconnection to game')
			const player = room.players.find(player => (player.id == userId))
			socket.emit('reconnect-offer', player.name)

			socket.on('reconnect-accept', () => {
				player.reconnect(socket)
			})
		}
	}	

	socket.on('join-request', ({ userId, username, roomId }) => {
		let room
		if (roomId) {
			room = rooms.find(room => (room.id == roomId))
			if (!room) {
				socket.emit('join-room', {joinWorked: false})
				return
			}
		} else {
			room = new Room()
			rooms.push(room)
		}
		if(room.hasPlayer(userId)) {
			room.getPlayer(userId).reconnect
		} else {
			room.addPlayer(new Player(username, socket))
		}
	})

	socket.on('disconnect', () => {
		//bad scaling, replace later
		rooms.find(room => {
			let player = room.players.find(player => {
				if(player.socket == socket) {
					player.disconnect()
					return true
				}
			})
			if (player) return true
		})			
	})
})



const rooms = []

/* 

class Player {
	constructor(name, socket, roomId){
	this.room = roomId //unnecessary?

	socket.join(this.room)
	socket.to(this.room).emit('add-player', this.dataSet) //sending to all clients in this.room except sender
	socket.emit('accept-join', true)
	}
	//getters
	}
	set answer(newAnswer){
	this.playerAnswers[game.round] = newAnswer
	}
	addScore(num){
	this.playerScore = this.playerScore + num
	}
}

class Question {
	constructor(creator, questionText, answers){
	this.creator = creator.id
	this.questionText = questionText
	this.answers = answers
	this.wasAsked = false
	creator.questionCount++
	}
}

class InputQuestion extends Question {
	constructor(creator, questionText, answer) {
	super(creator, questionText, answer)
	this.type = "input"
	console.log("InputQuestion constructor called")
	}
}

class ChoiceQuestion extends Question {
	constructor(creator, questionText, answer, options) {
	super(creator, questionText, answer)
	this.type = "choice"
	this.options = options
	console.log("ChoiceQuestion constructor called")
	}
}

class Room {
	constructor(){
	this.id = randomString(4)
	this.players = []
	this.game = new Game(this.id)
	console.log(`Room ${this.id} created`)
	}
	addPlayer(name, socket){
	const newPlayer = new Player(name, socket, this.id)
	this.players.push(newPlayer)
	this.players.forEach(player => socket.emit('add-player', player.dataSet))
	console.log(`Player ${newPlayer.name} (${newPlayer.id}) joined Room ${this.id}`)
	return newPlayer
	}
	removePlayer(socket){
	const playerToRemove = this.players.find(player => player.id == socket.id)
	socket.to(this.id).emit('delete-player', socket.id)
	this.players = this.players.filter(player => player.id != socket.id)
	if(playerToRemove) console.log(`Player ${playerToRemove.name} left Room ${this.id}`)
	}
	printPlayers(){
	let string = "Room: " + this.id + " | Players: "
	for (let i = 0; i < this.players.length; i++){
		string += this.players[i].name + " (" + this.players[i].id + "), "
	}
	console.log(string)
	}
}

class Game {
	constructor(room){
	this.round = 0
	this.isRunning = false
	this.roundInProgress = false
	this.questions = []
	this.room = room
	console.log("New game created")
	}
	addQuestion(questionData, type){
	let newQuestion
	switch(type){
		case "input":
		newQuestion = new InputQuestion(questionData.creator, questionData.questionText, questionData.answer)
		case "choice":
		newQuestion = new ChoiceQuestion(questionData.creator, questionData.questionText, questionData.answers, questionData.options)
	}
	this.questions.push(newQuestion)
	}
	async gameloop(){
	this.isRunning = true
	//load questions
	while(this.isRunning) {
		this.roundInProgress = true
		this.round++
		//send question
		//wait
		//evaluate answers + update score
		//if no questions left => isRunning = false
		this.isRunning = false
	}
	//display winner
	}
}


 */
