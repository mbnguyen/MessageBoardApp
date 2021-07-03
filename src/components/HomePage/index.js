import React from 'react'
import { Typography, Paper, Avatar, Button } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

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

function HomePage(props) {
	const { classes } = props

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Hello Guest!
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={gotoLogIn}
					className={classes.submit}>
					Login
          		</Button>
			</Paper>
		</main>
	)

	function gotoLogIn() {
		props.changeState("Login");
	}
}

export default withStyles(styles)(HomePage)