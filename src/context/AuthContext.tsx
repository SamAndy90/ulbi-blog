"use client"

import { Dispatch, SetStateAction, createContext } from "react";
import { useState, useContext, useMemo } from "react";

export type AuthContextType = {
    isAuth: boolean;
    setIsAuth: (value: boolean) => void;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>
};

const defaultContextValues = {
    isAuth: false,
    setIsAuth: () => {},
    isLoading: true,
    setIsLoading: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultContextValues);

export type AuthContextProviderProps = {
    children?: React.ReactNode;
};

export function AuthContextProvider(props: AuthContextProviderProps) {
    const { children } = props;
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const store = useMemo(
        () => ({
            isAuth,
            setIsAuth,
            isLoading,
            setIsLoading
        }),
        [isAuth, isLoading, setIsAuth, setIsLoading]
      );

    return (<AuthContext.Provider value={store}>{children}</AuthContext.Provider>)
}

export function useAuthContext() {
    return useContext(AuthContext);
}