import {createContext} from 'react';

export interface LoggedInContextProps {
    isLoggedIn : boolean,
    id:string|null
}

export const LoggedInContext = createContext({} as LoggedInContextProps);
