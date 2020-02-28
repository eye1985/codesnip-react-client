import {createContext} from 'react';

export interface IContextProps {
    updateNav(nav:string, userId: number, codeId: number):void
}

export const NavigationProvider = createContext({} as IContextProps);
