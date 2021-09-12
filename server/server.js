const Player = require('./classes/Player')
const Room = require('./classes/Room')

const io = require('socket.io')(5000, {cors: {
	origin: "*",
	methods: ["GET", "POST"]
}})

io.on('connection', socket => {

	// create room
	socket.on('create-room', ({ playerName }) => {
		console.log(`'create-room' received: {playerName: ${playerName}}`)
		const room = new Room(io)
		rooms.push(room)
		room.addPlayer(new Player(playerName, socket))
		socket.room = room
	})
	
	// join room
	socket.on('join-request', ({ playerName, roomId }) => {
		console.log(`'join-request' received: {playerName: ${playerName}, roomId: ${roomId}}`)
		const room = getRoom(roomId)
		if (!room) {
			socket.emit('join-room-error', {message: "Room not found. To create a new room leave the field empty!"})
			return
		}
		room.addPlayer(new Player(playerName, socket))
		socket.room = room
	})

	// reconnect
	socket.on('check-reconnect', ({ playerId, roomId }) => {
		console.log(`'check-reconnect' received: {playerId: ${playerId}, roomId: ${roomId}}`)
		const room = getRoom(roomId)
		if (!room) return
		const player = room.getPlayer(playerId)
		if (!player) return
		socket.emit('reconnect-offer', {
			prevPlayerName: player.name,
		})
		socket.on('accept-reconnect', () => {
			console.log(`'accept-reconnect' received: {playerId: ${playerId}, roomId: ${roomId}}`)
			player.reconnect(socket)
		})
	})
})

const rooms = []

const getRoom = roomId => rooms.find(room => (room.id == roomId.toLowerCase()))