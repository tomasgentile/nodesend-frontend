import { SHOW_ALERT, HIDE_ALERT, UPLOAD, UPLOAD_SUCCESS, UPLOAD_ERROR, CREATELINK_SUCCESS, RESET_APP, ADD_PASSWORD, ADD_DOWNLOADS } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                msg_file: action.payload
            }
        case HIDE_ALERT:
            return {
                ...state,
                msg_file: null
            }
        case UPLOAD:
            return {
                ...state,
                loading: true
            }
        case UPLOAD_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                original_name: action.payload.original_name,
                loading: false
            }
        case UPLOAD_ERROR:
            return {
                ...state,
                msg_file: action.payload,
                loading: false
            }
        case CREATELINK_SUCCESS:
            return {
                ...state,
                url: action.payload
            }
        case RESET_APP:
            return {
                ...state,
                msg_file: null,
                name: '',
                original_name: '',
                loading: false,
                downloads: 1,
                password: '',
                author: null,
                url: ''
            }
        case ADD_PASSWORD: 
            return {
            ...state,
            password: action.payload
        }
        case ADD_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
            }
        default:
            return state;
    }
}