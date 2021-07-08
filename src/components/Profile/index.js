import React, { useState, useEffect } from "react";
import {
    Typography,
    Paper,
    Avatar,
    Button,
    FormControl,
    Input,
    InputLabel,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";

const styles = (theme) => ({
    main: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
    },
    paper: {
        marginTop: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
    },
    submit: {
        marginTop: 30,
    },
});

function Profile(props) {
    const { classes } = props;

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const [fnameDisplay, setFnameDisplay] = useState("");
    const [lnameDisplay, setLnameDisplay] = useState("");

    useEffect(() => {
		firebase.getCurrentUserFirstName().then(setFnameDisplay);
        firebase.getCurrentUserLastName().then(setLnameDisplay);
	});

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={(e) => e.preventDefault() && false}
                >
                    <Typography>
                        First Name: {fnameDisplay}
                    </Typography>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="fname">First name</InputLabel>
                        <Input
                            id="fname"
                            name="fname"
                            autoComplete="off"
                            autoFocus
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </FormControl>
                    <Typography>
                        Last Name: {lnameDisplay}
                    </Typography>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="lname">Last name</InputLabel>
                        <Input
                            name="lname"
                            id="lname"
                            autoComplete="off"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={save}
                        className={classes.submit}
                    >
                        Save
                    </Button>
                </form>
            </Paper>
        </main>
    );

    async function save() {
        firebase.updateFName(fname);
        firebase.updateLName(lname);
        props.changeState("Dashboard");
    }
}

export default withStyles(styles)(Profile);
