import Page from './Page'
import { SocketProvider } from '../contexts/SocketContext'
import { LocalDataProvider } from '../contexts/LocalDataContext'
import '../stylesheets/App.css'


function App() {

	return (
		<SocketProvider>
			<LocalDataProvider>
				<Page/>
			</LocalDataProvider>
		</SocketProvider>
	);
}

export default App;
