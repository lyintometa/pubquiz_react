import React from 'react'
import Join from './JoinPage/JoinPage'
import Room from './Room/Room.js'
import { useLocalData } from '../contexts/LocalDataContext'
import { JoinProvider } from '../contexts/JoinContext'
import { RoomDataProvider } from '../contexts/RoomDataContext'
import Header from './Header'

export default function Page() {
	const { page } = useLocalData()

    

	const loginArea = (
		<JoinProvider>
			<Join/>
		</JoinProvider>
	)
	
	const roomArea = (
		<>
			<Header/>
			<RoomDataProvider>
				<Room/>
			</RoomDataProvider>
		</>
	  )


	  /* <QuestionsProvider id={id} room={room}>
			<GameProvider gameState={gameState} setGameState={setGameState}>
			  {gameState === 'finished' ? <Results/> : <Room room={room} gameState={gameState} isAdmin={isAdmin} />}
			</GameProvider>
		  </QuestionsProvider> */
    
	const getPage = () => {
		switch (page) {
			case "join":
				return loginArea
			case "room":
				return roomArea
			default:
				break;
		}
	}
    return (
        <div>
            {getPage()}
        </div>
    )
}
