import { createContext } from 'react';

interface ILoginContext {
    fulhausSite: <SetStateAction<boolean>>;
    setFulhausSite: <SetStateAction<boolean>>;
}


export const LoginContext = createContext<ILoginContext | null>(null)