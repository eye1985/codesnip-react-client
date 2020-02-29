import {createContext} from 'react';

export interface LoggedInContextProps {
    isLoggedIn : boolean
}

export const LoggedInContext = createContext({} as LoggedInContextProps);
