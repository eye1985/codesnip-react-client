import React, {useEffect, useState, useContext} from 'react';
import {Link, RouteComponentProps} from "react-router-dom";

import ApiUrl from "apiUrl";
import {LoggedInContext} from "Context/LoggedInContext";

import {Pagination} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useListStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: '20px',
    },
    inline: {
        display: 'inline',
    },
    link: {
        display: "flex",
        textDecoration: "none",
        color:"inherit"
    }
}));

const useCodeListStyles = makeStyles(theme => ({
    header: {
        fontSize: '20px',
        margin: "20px auto",
    }
}));

const usePaginationStyles = makeStyles(theme => ({
    pagination: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
    }
}));

interface CodeListItem {
    userId: number,
    codeId: number,
    title: string,
    description: string,
    username: string
}

export default function (props:RouteComponentProps) {
    const loggedInContext = useContext(LoggedInContext);

    const listClasses = useListStyles();
    const codeListClasses = useCodeListStyles();
    const paginationClasses = usePaginationStyles();

    const [codes, setCodes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [searchParams, setSearchParams] = useState("start=1&hitPerPage=10");

    const isMySnippet = props.location.pathname === "/mySnippet";

    useEffect(() => {
        const getData = async (url:string) => {
            const response = await fetch(url,{
                method:"get",
                credentials:'include',
            });
            const data = await response.json();

            setCodes(data.codes);
            setTotalPages(data.totalPage);
        };

        if(isMySnippet){
            const userId = loggedInContext.id;
            if(userId){
                getData(`${ApiUrl.userCodes(userId)}?${searchParams}`);
            }
        }else{
            getData(`${ApiUrl.codes}?${searchParams}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.location.pathname]);

    const handleChange = (event:React.ChangeEvent, value: number) => {
        value -= 1;
        setSearchParams(`start=${(value * 10) + 1}&hitPerPage=10`)
    };

    const urlPrefix = isMySnippet ? `/mySnippet/user/` : `/user/`;

    return (
        <div>
            <header className={codeListClasses.header}>
                Code snippets
            </header>

            <List className={listClasses.root}>
                {codes && codes.map((code: CodeListItem, index) => {
                    return (
                        <ListItem key={index}
                                  alignItems="flex-start">
                            <Link className={listClasses.link} to={`${urlPrefix}${code.userId}/code/${code.codeId}`}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src=""/>
                                </ListItemAvatar>

                                <ListItemText
                                    primary={code.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={listClasses.inline}
                                                color="textPrimary"
                                            >
                                                {code.description}
                                            </Typography>
                                            <span>
                                                <br/>
                                                {code.username}
                                            </span>
                                        </React.Fragment>
                                    }
                                />
                            </Link>
                        </ListItem>
                    )
                })}
            </List>

            <Pagination className={paginationClasses.pagination} count={totalPages} color="primary"
                        onChange={handleChange}/>
        </div>
    )
}