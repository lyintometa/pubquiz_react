import { useRoom } from '../contexts/RoomProvider'
import { useQuestions } from '../contexts/QuestionsProvider'
import GameMenu from './GameMenu'
import QuestionArea from './QuestionArea'
import '../stylesheets/Room.css'
import { GiCheckMark } from 'react-icons/gi';


export default function Room({ room, gameState, isAdmin }) {
    const { playersData } = useRoom()
    const { showNewQuestionModal } = useQuestions()
 
    return (
        <div className={["room-container", showNewQuestionModal ? "hidden-small" : ""].join(" ")}>
            <table className="game-table">
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>Name</th>
                        <th>Answer {room}</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {playersData.map(player => (
                        <tr key={player.id}>
                            <td className="player-score">{player.score}</td>
                            <td className="player-name">{player.name}</td>
                            <td className="player-answer">{player.lastAnswer}</td>
                            <td className="player-state">{player.state ? <GiCheckMark/> : null}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="room-content-container">
                {gameState == 'not started' ? <GameMenu modalOpen="modalOpen" isAdmin={isAdmin}/> : <QuestionArea/>}
            </div>
        </div>
        
    )
}
