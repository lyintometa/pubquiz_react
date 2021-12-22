import io from './Socket/io.js'

import Room from '../classes/Room.js'
import { EVENT_EMIT, EVENT_RECEIVED } from '../constants/events.js'

io.on('connection', socket => {

	// create room
	socket.on(EVENT_RECEIVED.ROOM.CREATE, ({ playerName }) => {
		console.log(`'${EVENT_RECEIVED.ROOM.CREATE}' received: {playerName: ${playerName}}`)
		const room = new Room(io)
		rooms.push(room)
		room.addNewPlayer(playerName, socket)
	})
	
	// join room
	socket.on(EVENT_RECEIVED.ROOM.JOIN, ({ playerName, roomId }) => {
		console.log(`'${EVENT_RECEIVED.ROOM.JOIN}' received: {playerName: ${playerName}, roomId: ${roomId}}`)
		const room = getRoom(roomId)
		if (!room) {
			socket.emit(EVENT_EMIT.ROOM.REJECT_JOIN, {message: "Room not found. To create a new room leave the field empty!"})
			return
		}
		room.addNewPlayer(playerName, socket)
	})

	// reconnect
	socket.on(EVENT_RECEIVED.INFO.REQUEST_RECONNECT, ({ playerId, roomId }) => {
		console.log(`'${EVENT_RECEIVED.INFO.REQUEST_RECONNECT}' received: {playerId: ${playerId}, roomId: ${roomId}}`)
		const room = getRoom(roomId)
		const player = room?.getPlayer(playerId)
		if (!player) return
		socket.emit(EVENT_EMIT.INFO.OFFER_RECONNECT, { prevPlayerName: player.name })
		socket.on('accept-reconnect', () => {
			console.log(`'accept-reconnect' received: {playerId: ${playerId}, roomId: ${roomId}}`)
			player.reconnect(socket)
		})
	})
})

io.listen(5000)

const rooms = []

const getRoom = roomId => rooms.find(room => (room.id == roomId.toLowerCase()))