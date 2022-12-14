import React, {createContext, useContext, useState} from "react";
import gatewayProvider from "./GatewayProvider";
import yagnaProvider from "./YagnaProvider";

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

// @ts-ignore
export const AuthProvider = ({children}) => {
    const getInitialState = function() : string {
        console.log("getInitialState");
        let token = localStorage.getItem("token") || "";
        gatewayProvider.setToken(token);
        yagnaProvider.setToken(token);
        return token;
    }

    const [token, setTokenState] = useState(getInitialState());

    const setToken = function (val: string) {
        gatewayProvider.setToken(val);
        yagnaProvider.setToken(val);
        setTokenState(val);
        localStorage.setItem('token', val);
    }

    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}
