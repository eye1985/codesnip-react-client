import React, {useState, useEffect, useContext} from 'react';
import ApiUrl from "apiUrl";
import {LoggedInContext} from "Context/LoggedInContext";
import {languageMap, IdAndLanguage} from "model/language";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-less";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-razor";
import "ace-builds/src-noconflict/mode-sql";

import "ace-builds/src-noconflict/ext-language_tools";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/webpack-resolver";
import AceEditor from "react-ace";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background:"#fff",
            padding:"20px",
            '& > *': {
                margin: theme.spacing(1),
                width: 200,
            },
        },

        formControl: {
            margin: theme.spacing(1),
            width: "100%",
        },
    }),
);

const CreateSnippet = () => {
    const history = useHistory();
    const classes = useStyles();

    const loggedInContext = useContext(LoggedInContext);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [languages, setLanguages] = useState([]);
    const [language, setLanguage] = useState("5");

    const [publicCode, setPublicCode] = useState("true");


    const [mode, setMode] = useState("javascript");
    const [code, setCode] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const language = event.target.value as string;
        setLanguage(language);
        setMode(languageMap[parseInt(language)]);
    };

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    };

    const handlePublic = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPublicCode((event.target as HTMLInputElement).value);
    };

    const createCode = async () => {
        setDisabled(true);

        const formData = new FormData();
        formData.append("title",title);
        formData.append("description",desc);
        formData.append("code",code);
        formData.append("languageId",language);

        const loggedInId = loggedInContext.id;

        if(loggedInId){
            formData.append("languageid",loggedInId);

            const response = await fetch(ApiUrl.createCode(loggedInId),{
                method:"POST",
                credentials:'include',
                body:formData
            });

            if(response.status === 200){
                history.push("/mySnippet");
            }
        }
    };

    useEffect(() => {
        (async function(){
            const response = await fetch(ApiUrl.languages);
            const json = await response.json();
            setLanguages(json);
        })()
    },[]);

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.formControl}>
                <TextField
                    id="snippetTitle"
                    label="Title"
                    value={title}
                    onChange={handleTitle} />
            </FormControl>

            <FormControl className={classes.formControl}>
                <TextField
                    label="Description"
                    variant="outlined"
                    value={desc}
                    onChange={handleDesc}
                    multiline
                    rows={5}
                    rowsMax={10}
                />
            </FormControl>

            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Visibility</FormLabel>
                <RadioGroup aria-label="public" name="public" value={publicCode} onChange={handlePublic}>
                    <FormControlLabel value="true" control={<Radio />} label="Public" />
                    <FormControlLabel value="false" control={<Radio />} label="Private" />
                </RadioGroup>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="snippetLanguage">
                    Language
                </InputLabel>
                <Select
                    labelId="snippetLanguage"
                    value={language}
                    onChange={handleChange}
                >
                    {
                        languages.map((language:IdAndLanguage) =>
                            <MenuItem key={language.id} value={language.id}>
                                {language.language}
                            </MenuItem>)
                    }
                </Select>
            </FormControl>

            <InputLabel id="code">
                Code
            </InputLabel>

            <AceEditor
                mode={mode}
                theme="monokai"
                name="createSnippet"
                width="100%"
                fontSize={16}
                showPrintMargin={false}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                enableSnippets={true}
                highlightActiveLine={true}
                onChange={setCode}
                value={code}
                editorProps={{ $blockScrolling: true }}
            />

            <Button variant="contained" color="primary" onClick={createCode} disabled={disabled}>
                Create
            </Button>
        </form>
    )
};

export default CreateSnippet;
