import { USER_AUTH, SIGNUP_SUCCESS, SIGNUP_ERROR, HIDE_ALERT, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
        case SIGNUP_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                auth: true
            }
        case HIDE_ALERT: 
            return {
                ...state,
                message: null
            }
        case USER_AUTH:
            return {
                ...state,
                user: action.payload,
                auth: true
            }
        case LOGOUT:
            return {
                user: null,
                token: null,
                auth: null,
                message: null
            }
        default:
            return state;
    }
}