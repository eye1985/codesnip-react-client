import React, {useState, useContext, FormEvent} from "react";
import {useHistory} from "react-router-dom";

import {setAuth,getAuth} from "sessionStore";
import {LoggedInContext} from "Context/LoggedInContext";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ApiUrl from "apiUrl";

export default function(){
    const history = useHistory();
    const loggedInContext = useContext(LoggedInContext);

    const useStyles = makeStyles(theme => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
    }));

    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (event:FormEvent) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);

        const response = await fetch(ApiUrl.login,{
            method:"POST",
            credentials:'include',
            body:formData
        });

        if (response.status === 200){
            setAuth(true);
            loggedInContext.isLoggedIn = getAuth();
            history.push("/");
        }
    };

    const handleUsername = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={loginHandler}>
            <TextField label="Username" onChange={handleUsername} />
            <TextField label="Password" onChange={handlePassword} type="password" />

            <div>
                <Button color="primary" variant="contained" type="submit">
                    Login
                </Button>
            </div>
        </form>
    )
}