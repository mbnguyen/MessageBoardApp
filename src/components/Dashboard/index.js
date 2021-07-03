import React, { useState, useEffect} from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel, Icon } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import generalPic from './general.png'
import randomPic from './random.png'

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


function Dashboard(props) {
	const { classes } = props

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Message Board App
       			</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={general}
					className={classes.submit}>
                        <Avatar className={classes.avatar} src={generalPic}/>
					General
          		</Button>
                  <Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={random}
					className={classes.submit}>
                        <Avatar className={classes.avatar} src={randomPic}/>
				    Random
          		</Button>
			</Paper>
		</main>
	)

	function general() {
		props.changeState("ChatGeneral");
	}

    function random() {
		props.changeState("ChatRandom");
	}
}

export default withStyles(styles)(Dashboard)