import { useState } from 'react'
import Join from './Join'
import Room from './Room'
import useLocalStorage from '../hooks/useLocalStorage'
import { SocketProvider } from '../contexts/SocketProvider'
import { JoinProvider } from '../contexts/JoinProvider'
import { RoomProvider } from '../contexts/RoomProvider'
import { QuestionsProvider } from '../contexts/QuestionsProvider'
import { GameProvider } from '../contexts/GameProvider'
import Results from './Results'
import '../stylesheets/App.css'


function App() {
  const [id, setId] = useLocalStorage('id')
  const [room, setRoom] = useLocalStorage('room')
  const [insideRoom, setInsideRoom] = useState(false)
  const [gameState, setGameState] = useState("not started")
  const [isAdmin, setIsAdmin] = useState(false)
  

  const loginArea = (
    <JoinProvider id={id} setId={setId} setInsideRoom={setInsideRoom} room={room} setRoom={setRoom}>
      <Join room={room}/>
    </JoinProvider>
  )

  const roomArea = (
    <RoomProvider setIsAdmin={setIsAdmin}>      
      <QuestionsProvider id={id} room={room}>
        <GameProvider setGameState={setGameState}>
          {gameState === 'finished' ? <Results/> : <Room room={room} gameState={gameState} isAdmin={isAdmin} />}
        </GameProvider>
      </QuestionsProvider>
    </RoomProvider>
  )

  return (
    <SocketProvider id={id} roomId={room}>
      {insideRoom ? roomArea : loginArea}
    </SocketProvider>
  );
}

export default App;
