import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//Material
import Container from '@material-ui/core/Container';

//Local
import {getAuth, getUserId} from "sessionStore";
import {LoggedInContext, LoggedInContextProps} from "Context/LoggedInContext";
import Code from "Component/Code";
import CodeList from "Component/CodeList";
import AppShell from "Component/AppShell/Index";
import Login from "Component/Login";
import CreateSnippet from "Component/CreateSnippet";

import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
    const isLoggedProp:LoggedInContextProps = {
        isLoggedIn : getAuth(),
        id:getUserId(),
    };

    return (
        <LoggedInContext.Provider value={isLoggedProp}>
            <CssBaseline/>
            <Router>
                <AppShell>
                    <Container maxWidth="xl">
                        <Switch>
                            <Route exact path="/" component={CodeList} />

                            <Route path={`/user/:userId/code/:codeId`}>
                                <Code />
                            </Route>

                            <Route exact path="/createUser">
                                <h1>Under dev</h1>
                            </Route>

                            <Route exact path="/createSnippet" component={CreateSnippet} />

                            <Route exact path="/mySnippet">
                                <h1>Under dev</h1>
                            </Route>

                            <Route exact path="/login" component={Login} />
                        </Switch>
                    </Container>
                </AppShell>
            </Router>
        </LoggedInContext.Provider>
    );
}

export default App;
