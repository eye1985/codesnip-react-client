import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


//Material
import Container from '@material-ui/core/Container';

//Local
import {getAuth} from "sessionStore";
import {LoggedInContext, LoggedInContextProps} from "Context/LoggedInContext";
import Code from "Component/Code";
import CodeList from "Component/CodeList";
import TopBar from "Component/TopBar";
import Login from "Component/Login";

import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
    const isLoggedProp:LoggedInContextProps = {
        isLoggedIn : getAuth()
    };

    return (
        <LoggedInContext.Provider value={isLoggedProp}>
            <CssBaseline/>
            <Router>
                <TopBar/>
                <Container maxWidth="xl">
                    <Switch>
                        <Route exact path="/">
                            <CodeList/>
                        </Route>

                        <Route path={`/user/:userId/code/:codeId`}>
                            <Code />
                        </Route>

                        <Route exact path="/createUser">
                            <h1>Under dev</h1>
                        </Route>

                        <Route exact path="/login" component={Login} />

                        <Route exact path="/logout">
                            <h1>Under dev</h1>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </LoggedInContext.Provider>
    );
}

export default App;
