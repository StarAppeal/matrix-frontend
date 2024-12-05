import React from "react";
import {useAuth} from "@/src/context/AuthProvider";
import {Redirect} from "expo-router";

const AuthenticatedWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Redirect href={"/login"}/>;
    }

    return <>{children}</>;
};

export default AuthenticatedWrapper;
