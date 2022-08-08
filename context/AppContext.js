import { createContext, useReducer } from "react";
import { SHOW_ALERT, HIDE_ALERT, UPLOAD, UPLOAD_SUCCESS, UPLOAD_ERROR, CREATELINK_SUCCESS, RESET_APP, ADD_PASSWORD, ADD_DOWNLOADS } from '../types';
import AppReducer from "./AppReducer";
import axiosClient from "../config/axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const initialState = {
        msg_file: null,
        name: '',
        original_name: '',
        loading: false,
        downloads: 1,
        password: '',
        author: null,
        url: ''
    }

    // Reducer
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const showAlert = (msg) => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            });
        }, 3000);
    }

    // Upload Files 
    const uploadFiles = async (formData, filename) => {
        dispatch({
            type: UPLOAD
        });
        try {
            const response = await axiosClient.post('/api/files', formData);
            dispatch({
                type: UPLOAD_SUCCESS,
                payload: {
                    name: response.data.file,
                    original_name: filename
                }
            });
        } catch (error) {
            dispatch({
                type: UPLOAD_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    const createLink = async () => {
        const linkData = {
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }
        try {
            const response = await axiosClient.post('/api/links', linkData);
            dispatch({
                type: CREATELINK_SUCCESS,
                payload: response.data.url
            });
        } catch (error) {
            console.log(error)
        }
    }

    const resetApp = () => {
        dispatch({
            type: RESET_APP
        });
    }

    const addPassword = password => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        });
    }

    const addDownloads = downloads => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: downloads
        });
    }

    return (
        <AppContext.Provider
            value={{
                msg_file: state.msg_file,
                name: state.name,
                original_name: state.original_name,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFiles,
                createLink,
                resetApp,
                addPassword,
                addDownloads
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider }

export default AppContext;