import React, {createContext, useContext, useState} from "react";
import gatewayProvider from "./GatewayProvider";


export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

// @ts-ignore
export const AuthProvider = ({children}) => {
    const [token, setTokenState] = useState(null);

    const setToken = function (val: string) {
        gatewayProvider.setToken(val);
        setTokenState(val);
    }

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

/*
export const AuthContext: any = createContext({});
// @ts-ignore
export const AuthProvider: any= ({ children }) => {
    const [token, setToken] = useState(null);
    return (
        <AuthContext.Provider value={ { token, setToken } }>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);

 */