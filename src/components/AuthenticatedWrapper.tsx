import React from "react";
import {useAuth} from "@/src/context/AuthProvider";
import NotAuthenticated from "@/src/components/NotAuthenticated";

const AuthenticatedWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <NotAuthenticated />;
       // return <Redirect href={"/login"}/>;
    }

    return <>{children}</>;
};

export default AuthenticatedWrapper;
