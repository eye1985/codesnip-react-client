import React, { useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from "react-router-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/webpack-resolver";

interface CodeParam {
    userId:string,
    codeId: string,
}

export default function () {
    const history = useHistory();
    const params = useParams();
    const {userId, codeId} = (params as CodeParam);

    const [code, setCode] = useState("Loading code");
    const [title, setTitle] = useState("Loading title");
    const [desc, setDesc] = useState("Loading desc");

    const backHandler = () => {
        history.push("/");
    };

    const getCodeUrl = (userCode: string, codeId: string) =>
        `http://localhost:3000/v1/user/${userCode}/code/${codeId}`;

    useEffect(() => {
        (async function(){
            const response = await fetch(getCodeUrl(userId,codeId));
            const json = await response.json();
            setCode(json.code);
            setTitle(json.title);
            setDesc(json.description);
        })()
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
                mode="javascript"
                theme="monokai"
                name="UNIQUE_ID_OF_DIV"
                readOnly={true}
                width="100%"
                value={code}
                editorProps={{ $blockScrolling: true }}
            />
        </div>
    )
}