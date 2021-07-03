import React, { useState, useEffect } from 'react'
import './styles.css'
import HomePage from '../HomePage'
import Login from '../Login'
import Chat from '../Chat'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import firebase from '../firebase';
import '../App.css';

const theme = createMuiTheme()

const styles = theme => ({
	main: {
		width: 400,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	paper: {
		marginTop: 100,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 20,
	},
	submit: {
		marginTop: 30,
	},
})

export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false);

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})


	return firebaseInitialized !== false ? (
		<MuiThemeProvider className='App' theme={theme}>
			<Screen/>
			{/* <Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/dashboard" component={Dashboard} />
				</Switch>
			</Router> */}
		</MuiThemeProvider>
	) : <div id="loader"><CircularProgress /></div>
}

function Screen() {

	const [state, setState] = useState("HomePage");

	switch(state) {
		case "HomePage":
			return (<HomePage changeState={setState}/>);
		case "Login":
			return (<Login changeState={setState}/>);
		case "Dashboard":
			return (<Chat changeState={setState}/>);
		default:
			return (<CircularProgress/>);
	}

	
}

