import React, {createContext, useState} from 'react';
import Container from '@material-ui/core/Container';
import Code from "./Component/Code";
import CodeList from "./Component/CodeList";
import TopBar from "./Component/TopBar";
import CssBaseline from '@material-ui/core/CssBaseline';
import {NavigationProvider, IContextProps} from "./Context/NavigationContext"

function App() {
    const [nav, setNav] = useState("codelist");
    const [codeId, setCodeId] = useState(0);
    const [userId, setUserId] = useState(0);

    const val:IContextProps = {
        updateNav: (nav:string, userId: number, codeId: number) => {
            setNav(nav);
            setCodeId(codeId);
            setUserId(userId);
        }
    };

    const renderComponent = () => {
        switch (nav) {
            case "codelist":
                return <CodeList />
            case "code":
                return <Code codeId={codeId} userId={userId} />
            default:
                return null
        }
    };

    return (
        <NavigationProvider.Provider value={val}>
            <CssBaseline />
            <TopBar />
            <Container maxWidth="xl">
                {renderComponent()}
            </Container>
        </NavigationProvider.Provider>
    );
}

export default App;
