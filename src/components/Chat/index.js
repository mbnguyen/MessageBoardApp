import React, { useRef, useState, useEffect} from 'react'
import { Typography, Paper, FormControl, InputLabel, CircularProgress, Button, Input } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase';
import '../App.css';

import {useCollectionData} from 'react-firebase-hooks/firestore';

const styles = theme => ({
	main: {
		width: 400,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	submit: {
		marginTop: 30,
	}
})

function Chat(props) {
	const { classes } = props;

	const [messageInput, setMessageInput] = useState('');

	const [messages] = useCollectionData(firebase.query, {idField: 'id'});

	const lastMsg = useRef();

	useEffect(() => {
		lastMsg.current.scrollIntoView({ behavior: 'smooth' });
	});

	if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.changeState("Login")
		return null
	}

	const sendMessage = async(e) => {
		e.preventDefault();

		const {uid} = firebase.auth.currentUser;

		await firebase.sendMessage(messageInput, uid);
		setMessageInput('');
		lastMsg.current.scrollIntoView({ behavior: 'smooth' });
	}


	return (
		<main className={classes.main}>
			<Paper className='window' required fullWidth>
				<Typography component="h1" variant="h5">
					Chat App
				</Typography>
				<div className='section'>
					<div className='chatWindow'>
						{messages && messages.map(msg => <Message key={msg.id} message={msg}/>)}
						<span ref={lastMsg}></span>
					</div>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="messageInput">Message</InputLabel>
						<Input id="messageInput" name="messageInput" autoComplete="off" autoFocus value={messageInput} onChange={e => setMessageInput(e.target.value)} />
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						onClick={sendMessage}
						className={classes.submit}>
						Send
					</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						onClick={logout}
						className={classes.submit}>
						Logout
					</Button>
				</div>
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.changeState("HomePage");
	}
}

function Message(props) {
	const {text, uid} = props.message;

	const messageClass = uid === firebase.auth.currentUser.uid ? 'sent': 'received';

	return(
		<div className={messageClass}>
			<p>{text}</p>
		</div>
	);
}

export default withStyles(styles)(Chat)