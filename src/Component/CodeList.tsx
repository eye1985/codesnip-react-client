import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

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

export default function () {
    const listClasses = useListStyles();
    const codeListClasses = useCodeListStyles();
    const paginationClasses = usePaginationStyles();

    const getCodesUrl = (param: string) => `http://localhost:3000/v1/codes?${param}`;

    const [codes, setCodes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [searchParams, setSearchParams] = useState("start=1&hitPerPage=10");

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(getCodesUrl(searchParams));
            const data = await response.json();

            setCodes(data.codes)
            setTotalPages(data.totalPage);
        };

        getData();
    }, [searchParams]);

    const handleChange = (event: any, value: number) => {
        value -= 1;
        setSearchParams(`start=${(value * 10) + 1}&hitPerPage=10`)
    };

    return (
        <div>
            <header className={codeListClasses.header}>
                Code snippets
            </header>

            <List className={listClasses.root}>
                {codes.map((code: CodeListItem, index) => {
                    return (
                        <ListItem key={index}
                                  alignItems="flex-start">
                            <Link className={listClasses.link} to={`/user/${code.userId}/code/${code.codeId}`}>
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