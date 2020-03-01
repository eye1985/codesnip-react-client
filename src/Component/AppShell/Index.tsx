import React, {useContext} from 'react';
import {LoggedInContext} from "Context/LoggedInContext";
import {Link, useHistory} from "react-router-dom";
import {getAuth, removeAuth} from "sessionStore";
import SideMenu,{drawerWidth} from "Component/AppShell/SideMenu";

// Material
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ApiUrl from "apiUrl";


const useStyles = makeStyles(theme => ({
    root: {
        display:"flex",
    },

    appBar: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toHome: {
        color: "#fff",
        textDecoration: "none",
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    toolbar: theme.mixins.toolbar,
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

const AppShell:React.FunctionComponent = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const loggedInContext = useContext(LoggedInContext);
    const {isLoggedIn} = loggedInContext;

    const loginHandler = () => {
        history.push("/login");
    };

    const logoutHandler = async () => {
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
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div className={classes.title}>
                        <Link className={classes.toHome} to="/">
                            <Typography variant="h6" display="inline">
                                Codesnip
                            </Typography>
                        </Link>
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>

                    {isLoggedIn ?
                        <Button color="inherit" onClick={logoutHandler} title="Logout">
                            <ExitToAppIcon/>
                        </Button>
                        :
                        <Button color="inherit" onClick={loginHandler} title="Login">
                            <AccountCircleIcon/>
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            <SideMenu />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
};

export default AppShell;
