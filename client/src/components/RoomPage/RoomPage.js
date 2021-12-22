//import { useQuestions } from '../contexts/QuestionsProvider'
import { useLocalData } from '../../contexts/LocalDataContext'
import { GameDataProvider } from '../../contexts/GameDataContext'/* 
import QuestionArea from './QuestionArea' */
import GameTable from '../GameTable/GameTable'
import GameMenu from '../GameMenu/GameMenu'

import './RoomPage.css'

export default function RoomPage() {
 
    return (
        <div className="room-container">
            <GameTable/>
            <GameMenu/>
            {/* <GameDataProvider>
            </GameDataProvider> */}
            {/* <div className="room-content-container">
                {gameState == 'not started' ? null : <QuestionArea/>}
                <GameMenu modalOpen="modalOpen" isAdmin={isAdmin} playersData={playersData} gameState={gameState}/>
            </div> */}
        </div>
        
    )
}
