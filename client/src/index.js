import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { SocketProvider } from './contexts/SocketContext';

ReactDOM.render(
	<React.StrictMode>
		<link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap" rel="stylesheet"></link>
		<SocketProvider>
			<Provider store={store}>
				<App/>
			</Provider>
		</SocketProvider>
	</React.StrictMode>,
  document.getElementById('root')
);
