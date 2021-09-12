//import { useQuestions } from '../contexts/QuestionsProvider'
import { useLocalData } from '../../contexts/LocalDataContext'
import { GameDataProvider } from '../../contexts/GameDataContext'/* 
import QuestionArea from './QuestionArea' */
import './Room.css'
import GameTable from './GameTable/GameTable'
import GameMenu from './GameMenu/GameMenu'


export default function Room() {
 
    return (
        <div className="room-container">
            <GameTable/>
            <GameDataProvider>
                <GameMenu/>
            </GameDataProvider>
            {/* <div className="room-content-container">
                {gameState == 'not started' ? null : <QuestionArea/>}
                <GameMenu modalOpen="modalOpen" isAdmin={isAdmin} playersData={playersData} gameState={gameState}/>
            </div> */}
        </div>
        
    )
}
