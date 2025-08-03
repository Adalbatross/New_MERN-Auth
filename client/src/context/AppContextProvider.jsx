import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const getAuthState = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/auth/is-auth', { withCredentials: true });
            const data = response.data;
            if (data.success) {
                setLoggedIn(true);
                getUserData();
            } else {
                setLoggedIn(false);
                setUserData(null);
            }
        } catch (error) {
          console.log(error);
          setLoggedIn(false);
          setUserData(null);
            // Optionally, don't show toast on initial load
        }
    };

    useEffect(() => {
        getAuthState();
        // eslint-disable-next-line
    }, []);

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data', { withCredentials: true });
            if (data.success) {
                setUserData(data.userData);
            } else {
                setUserData(null);
                toast.error(data.message);
            }
        } catch (error) {
            setUserData(null);
            const errorMsg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Something went wrong';
            toast.error(errorMsg);
        }
    };

    const value = {
        backendUrl,
        isLoggedIn, setLoggedIn,
        userData, setUserData,
        getUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;