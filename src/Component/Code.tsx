import React, { useState, useEffect} from 'react';
import ApiUrl from "apiUrl";
import {languageMap} from "model/language";

import Button from '@material-ui/core/Button';
import { useHistory, useParams, RouteComponentProps } from "react-router-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/webpack-resolver";

interface CodeParam {
    userId:string,
    codeId: string,
}

export default function (props:RouteComponentProps) {
    const history = useHistory();
    const params = useParams();
    const {userId, codeId} = (params as CodeParam);

    const [code, setCode] = useState("Loading code");
    const [title, setTitle] = useState("Loading title");
    const [desc, setDesc] = useState("Loading desc");
    const [language, setLanguage] = useState("javascript");

    const backHandler = () => {
        const isUnderMySnippet = props.location.pathname.indexOf("/mySnippet") !== -1;

        if(isUnderMySnippet){
            return history.push("/mySnippet");
        }

        history.push("/");
    };

    useEffect(() => {
        (async function(){
            const response = await fetch(ApiUrl.userCode(userId,codeId),{
                method:"get",
                credentials:"include"
            });

            const json = await response.json();
            setLanguage(languageMap[parseInt(json.languageId)]);
            setCode(json.code);
            setTitle(json.title);
            setDesc(json.description);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div>
            <Button variant="contained" onClick={backHandler}>
                Back
            </Button>

            <h1>
                {title}
            </h1>

            <article>
                {desc}
            </article>

            <AceEditor
                mode={language}
                theme="monokai"
                name="myCode"
                readOnly={true}
                width="100%"
                value={code}
                editorProps={{ $blockScrolling: true }}
            />
        </div>
    )
}