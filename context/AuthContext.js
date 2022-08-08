import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { USER_AUTH, SIGNUP_SUCCESS, SIGNUP_ERROR, HIDE_ALERT, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../types";
import axiosClient from "../config/axios";
import tokenAuth from "../config/tokenAuth";
import { useRouter } from "next/router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const router = useRouter();
    let initialToken;
    if (typeof window === 'undefined') {
        initialToken = null;
    } else {
        initialToken = localStorage.getItem('nodesend_token');
    }
    
    // Initial State
    const initialState = {
        token: initialToken,
        auth: null,
        user: null,
        message: null
    }

    // Reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Sign Up New Users
    const singupUser = async values => {
        try {
            const response = await axiosClient.post('/api/users', values);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: response.data.msg
            });
        } catch (error) {
            dispatch({
                type: SIGNUP_ERROR,
                payload: error.response.data.msg
            });
        }
        // Hide alert after 3 sec
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            });
            router.push('/');
        }, 3000);
    }

    // Login User
    const loginUser = async (values) => {
        try {
            const response = await axiosClient.post('/api/auth', values);
            localStorage.setItem('nodesend_token', response.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.token
            });
            router.push('/');
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
        // Hide alert after 3 sec
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            });
        }, 3000);
    }

    // Get user data from token
    const userAuth = async () => {
        const token = localStorage.getItem('nodesend_token');
        if (token) {
            tokenAuth(token);
        }
        try {
            const response = await axiosClient('/api/auth');
            if(response.data.user) {
                dispatch({
                    type: USER_AUTH,
                    payload: response.data.user
                });
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.message
            });
        }
    }

    const logout = () => {
        localStorage.removeItem('nodesend_token');
        dispatch({
            type: LOGOUT
        });
        initialToken = null;
        router.push('/');
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                message: state.message,
                userAuth,
                singupUser,
                loginUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };

export default AuthContext;