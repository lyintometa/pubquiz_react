import { useRoom } from '../contexts/RoomProvider'

export default function Room() {
    const { playersData } = useRoom()

    return (
        <table>
            <thead>
                <tr>
                    <th>Score</th>
                    <th>Name</th>
                    <th>Answer</th>
                </tr>
            </thead>
            <tbody>
                {playersData.map(player => (
                    <tr key={player.id}>
                    <td>{player.score}</td>
                    <td>{player.name}</td>
                    <td>{player.lastAnswer}</td>
                </tr>
                ))}
            </tbody>            
        </table>
    )
}
