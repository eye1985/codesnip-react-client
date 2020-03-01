import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
    }),
);

export default function(){
    const classes = useStyles();

    const clickHandler = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(11111);
    };

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['Code snippets'].map((text, index) => (
                    <ListItem button key={text} onClick={clickHandler}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Sign up','Sign in'].map((text, index) => (
                    <ListItem button key={text} onClick={clickHandler}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
};