import React, {useContext} from 'react';

import {NavLink, useHistory} from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CodeIcon from '@material-ui/icons/Code';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import {LoggedInContext} from "Context/LoggedInContext";
import {getAuth, removeAuth} from "sessionStore";
import ApiUrl from "apiUrl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        active: {
            "& .MuiTypography-root": {
                fontWeight: "bold",
            }
        },
        toolbar: theme.mixins.toolbar,
    }),
);

export default function () {
    const classes = useStyles();
    const history = useHistory();
    const loggedInContext = useContext(LoggedInContext);
    const {isLoggedIn} = loggedInContext;

    const signOutHandler = async () => {
        const response = await fetch(ApiUrl.logout,{
            method:"POST",
            credentials:'include',
        });

        if(response.status === 200){
            removeAuth();
            loggedInContext.isLoggedIn = getAuth();
            history.push("/");
        }
    };

    return (
        <>
            <div className={classes.toolbar}/>
            <List>
                <ListItem button component={NavLink} exact to="/" activeClassName={classes.active}>
                    <ListItemIcon>
                        <CodeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Code Snippets"/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                {
                    isLoggedIn ?
                        <>
                            <ListItem button component={NavLink} exact to="/createCode" activeClassName={classes.active}>
                                <ListItemIcon>
                                    <AccountCircleIcon/>
                                </ListItemIcon>
                                <ListItemText primary="My snippets"/>
                            </ListItem>

                            <ListItem button onClick={signOutHandler}>
                                <ListItemIcon>
                                    <AccountCircleIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Sign out"/>
                            </ListItem>
                        </>
                        :
                    <>
                        <ListItem button component={NavLink} exact to="/login" activeClassName={classes.active}>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Sign in"/>
                        </ListItem>

                        <ListItem button component={NavLink} exact to="/createUser"
                                  activeClassName={classes.active}>
                            <ListItemIcon>
                                <PersonAddIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Sign up"/>
                        </ListItem>
                    </>
                }
            </List>
        </>
    )
};