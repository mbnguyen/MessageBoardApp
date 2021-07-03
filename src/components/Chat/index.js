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
	paper: {
		marginTop: 100,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 20,
	},
	submit: {
		marginTop: 30,
	}
})

function Chat(props) {
	const { classes } = props;

	const [messageInput, setMessageInput] = useState('');

	const lastMsg = useRef();

	let query;
	let title = "";
	//const [title, setTitle] = useState("");

	if (props.board === "general") {
		query = firebase.queryGeneral;
		title = "General";
	} else if (props.board === "random") {
		query = firebase.queryRandom;
		title = "Random";
	}

	const [messages] = useCollectionData(query, {idField: 'id'});

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

		if (props.board === "general") {
			await firebase.sendMessageGeneral(messageInput, uid);
		} else if (props.board === "random") {
			await firebase.sendMessageRandom(messageInput, uid);
		}
		
		setMessageInput('');
		lastMsg.current.scrollIntoView({ behavior: 'smooth' });
	}


	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					{title}
				</Typography>
				<div>
					<div className="section">
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
	const {text, createdAt, uid} = props.message;

	const [fname, setName] = useState("");

	const date = createdAt ? createdAt.toDate().toString() : "";

	useEffect(() => {
		firebase.getUserFirstName(uid).then(setName);
	});

	return(
		<div className="message">
			<Typography component="h5" variant="h6">{fname}: {text}</Typography>
			<p>on {date}</p>
		</div>
	);
}

export default withStyles(styles)(Chat)