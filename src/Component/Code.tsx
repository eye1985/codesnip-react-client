import React, {useEffect, useState} from 'react';
import ApiUrl from "apiUrl";
import {languageMap, IdAndLanguage} from "model/language";

import Button from '@material-ui/core/Button';
import {RouteComponentProps, useHistory, useParams} from "react-router-dom";
import AceEditor from "react-ace";

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
import "ace-builds/webpack-resolver";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

interface CodeParam {
    userId: string,
    codeId: string,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            width: "100%",
        },
    }),
);

export default function (props: RouteComponentProps) {
    const history = useHistory();
    const classes = useStyles();
    const params = useParams();
    const {userId, codeId} = (params as CodeParam);

    const [code, setCode] = useState("Loading code");
    const [title, setTitle] = useState("Loading title");
    const [desc, setDesc] = useState("Loading desc");
    const [mode, setMode] = useState("javascript");
    const [languages, setLanguages] = useState([]);
    const [languageId, setLanguageId] = useState(4);
    const [languageString, setLanguageString] = useState("");

    const [edit, setEdit] = useState(false);

    const isUnderMySnippet = props.location.pathname.indexOf("/mySnippet") !== -1;

    const backHandler = () => {
        if (isUnderMySnippet) {
            return history.push("/mySnippet");
        }

        history.push("/");
    };

    const editHandler = async () => {
        if(edit){
            const formData = new FormData();
            formData.append("title",title);
            formData.append("description",desc);
            formData.append("languageId",languageId.toString());
            formData.append("code",code);

            const response = await fetch(ApiUrl.userCode(userId, codeId), {
                method: "PUT",
                credentials: "include",
                body:formData
            });

            if (response.status !== 200){
                console.error("Could not edit");
            }
        }

        setEdit(!edit);
    };

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    };

    const handleLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
        const language = event.target.value as string;
        setLanguageId(parseInt(language));
        setMode(languageMap[parseInt(language)]);
    };

    useEffect(() => {
        (async function () {
            const [userCodeRes, languagesRes] = await Promise.all([
                fetch(ApiUrl.userCode(userId, codeId), {
                    method: "get",
                    credentials: "include"
                }),
                fetch(ApiUrl.languages)
            ]);

            const userCodeJson = await userCodeRes.json();
            const languagesJson = await languagesRes.json();

            setLanguages(languagesJson);
            setMode(languageMap[parseInt(userCodeJson.languageId)]);

            setCode(userCodeJson.code);
            setTitle(userCodeJson.title);
            setDesc(userCodeJson.description);
            setLanguageId(userCodeJson.languageId);
            setLanguageString(userCodeJson.language);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const codeTitle = () => {
        if (edit){
            return (
                <FormControl className={classes.formControl}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={handleTitle} />
                </FormControl>
            )
        }

        return (
            <h1>
                {title}
            </h1>
        )
    };

    const codeDescription = () => {
        if (edit){
            return (
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
            )
        }

        return (
            <article>
                {desc}
            </article>
        )
    };

    const codeLanguages = () => {
        if (edit){
            return (
                <FormControl className={classes.formControl}>
                    <InputLabel id="snippetLanguage">
                        Language
                    </InputLabel>

                    <Select
                        labelId="snippetLanguage"
                        value={languageId}
                        onChange={handleLanguage}
                    >
                        {
                            languages.map((language:IdAndLanguage) =>
                                <MenuItem key={language.id} value={language.id}>
                                    {language.language}
                                </MenuItem>)
                        }
                    </Select>
                </FormControl>
            )
        }

        return (
            <div>
                {languageString}
            </div>
        )
    }

    return (
        <div>
            <Button variant="contained" onClick={backHandler}>
                Back
            </Button>

            {isUnderMySnippet ?
                <Button variant="contained" onClick={editHandler}>
                    {edit ? "Save":"Edit"}
                </Button>
                : null}

            {codeTitle()}
            {codeDescription()}
            {codeLanguages()}

            <AceEditor
                mode={mode}
                theme="monokai"
                name="myCode"
                readOnly={!edit}
                width="100%"
                fontSize={16}
                enableBasicAutocompletion={true}
                showPrintMargin={false}
                value={code}
                onChange={setCode}
                editorProps={{$blockScrolling: true}}
            />
        </div>
    )
}