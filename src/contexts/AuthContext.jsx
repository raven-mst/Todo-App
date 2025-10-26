import React from "react";
import { GET_USER_DATA } from "@utils/api";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {

    const storedAuthData = JSON.parse(localStorage.getItem('auth'));
    const storedUserData = JSON.parse(localStorage.getItem('user-data'));
    const [authLoading, setAuthLoading] = React.useState(storedAuthData ? false : true);
    const [authData, setAuthData] = React.useState(storedAuthData || undefined);
    const [userDataLoading, setUserDataLoading] = React.useState(storedUserData ? false : true);
    const [userData, setUserData] = React.useState(storedUserData || undefined);

    React.useEffect(() => { // Get User Data (API):

        if (!authData || userData) return;
        setUserDataLoading(true);

        GET_USER_DATA(authData.jwt)
            .then(data => {
                setUserData(data);
                localStorage.setItem('user-data', JSON.stringify(data));
            })
            .finally(() => setUserDataLoading(false));
    }, [userData, authData]);

    return (
        <AuthContext.Provider
            value={{
                authLoading,
                userDataLoading,
                authData,
                userData,
                setAuthLoading,
                setUserData,
                setAuthData
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => React.useContext(AuthContext);