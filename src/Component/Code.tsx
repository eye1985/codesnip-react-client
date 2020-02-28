import React, {useContext, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {NavigationProvider} from "../Context/NavigationContext";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/webpack-resolver";

export default function (props:{userId:number, codeId:number}) {
    const navigation = useContext(NavigationProvider);

    const [code, setCode] = useState("Loading code");
    const [title, setTitle] = useState("Loading title");
    const [desc, setDesc] = useState("Loading desc");

    const clickHandler = () => {
        navigation.updateNav("codelist", props.userId, props.codeId);
    };

    const getCodeUrl = (userCode: number, codeId: number) =>
        `http://localhost:3000/v1/user/${userCode}/code/${codeId}`;

    useEffect(() => {
        (async function(){
            const response = await fetch(getCodeUrl(props.userId,props.codeId));
            const json = await response.json();
            setCode(json.code);
            setTitle(json.title);
            setDesc(json.description);
        })()
    },[]);

    return (
        <div>
            <Button variant="contained" onClick={clickHandler}>
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