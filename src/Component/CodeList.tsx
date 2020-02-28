import React, {useEffect, useState, useContext} from 'react';
import {Pagination} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {NavigationProvider} from "../Context/NavigationContext";

const useListStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: '20px',
    },
    inline: {
        display: 'inline',
    },
}));

const useCodeListStyles = makeStyles(theme => ({
    header: {
        fontSize: '20px',
        margin: "20px auto",
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

    const getCodesUrl = (param: string) => `http://localhost:3000/v1/codes?${param}`;

    const [codes, setCodes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [searchParams, setSearchParams] = useState("start=1&hitPerPage=10");
    const navigation = useContext(NavigationProvider);

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

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let codeId = event.currentTarget.getAttribute("data-codeid");
        let userId = event.currentTarget.getAttribute("data-userid");

        if(!codeId){
            codeId = "0";
        }

        if(!userId){
            userId = "0";
        }

        navigation.updateNav("code", parseInt(userId),parseInt(codeId));
    };

    return (
        <div>
            <header className={codeListClasses.header}>
                List of codes
            </header>

            <List className={listClasses.root}>
                {codes.map((code: CodeListItem, index) => {
                    return (
                        <ListItem button key={index}
                                  alignItems="flex-start"
                                  data-codeid={code.codeId}
                                  data-userid={code.userId}
                                  onClick={handleClick}>
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
                                            <br />
                                            {code.username}
                                        </span>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    )
                })}
            </List>

            <Pagination count={totalPages} color="primary" onChange={handleChange}/>
        </div>
    )
}