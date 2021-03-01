import { useState } from 'react'
import Join from './Join'
import Room from './Room'
import useLocalStorage from '../hooks/useLocalStorage'
import { SocketProvider } from '../contexts/SocketProvider'
import { JoinProvider } from '../contexts/JoinProvider'
import { RoomProvider } from '../contexts/RoomProvider'


function App() {
  const [id, setId] = useLocalStorage('id')
  const [room, setRoom] = useLocalStorage('room')
  const [insideRoom, setInsideRoom] = useState(false)
  
  const roomArea = (
    <RoomProvider>
      <Room/>
    </RoomProvider>
  )
  const loginArea = (
    <JoinProvider id={id} setId={setId} setInsideRoom={setInsideRoom} room={room} setRoom={setRoom}>
      <Join room={room}/>
    </JoinProvider>
  )

  return (
    <SocketProvider id={id} roomId={room}>
      {insideRoom ? roomArea : loginArea}
    </SocketProvider>
  );
}

export default App;
