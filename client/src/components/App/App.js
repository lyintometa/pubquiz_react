import React from 'react'
import { useSelector } from 'react-redux'

import JoinPage from '../JoinPage/JoinPage'
import RoomPage from '../RoomPage/RoomPage'

import './App.css'

function App() {
	const connected = useSelector(state => state.socket.connected)
	const roomId = useSelector(state => state.room.id)

	if (!connected) return null
	return (
		<>
		{roomId ? <RoomPage/> : <JoinPage/>}
		</>
	)
}

export default App;
