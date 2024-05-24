import { Dispatch } from 'redux';
import axiosInstance from '../../utils/interceptor';
import {
    FETCH_LOGIN_FAILURE,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_REQUEST,
    FETCH_REGISTER_REQUEST,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_FAILURE,
} from './types';

interface Credentials {
    username?: string;
    email: string;
    password: string
}

interface UserData {
    token: string
}

const createAction = (type: string, payload?: any) => ({ type, payload });

// Login
export const login = (cred: Credentials) => async (dispatch: Dispatch) => {
    dispatch(createAction(FETCH_LOGIN_REQUEST));
    try {
        const { data } = await axiosInstance.post('/users/login', cred);
        dispatch(createAction(FETCH_LOGIN_SUCCESS, data as UserData));
    } catch (error: any) {
        dispatch(createAction(FETCH_LOGIN_FAILURE, error.response?.data?.message || error.message));
    }
};

// Register
export const registerUser = (cred: Credentials) => async (dispatch: Dispatch) => {
    dispatch(createAction(FETCH_REGISTER_REQUEST));
    try {
        const { data } = await axiosInstance.post('/users', cred);
        dispatch(createAction(FETCH_REGISTER_SUCCESS, data as UserData));
    } catch (error: any) {
        dispatch(createAction(FETCH_REGISTER_FAILURE, error.response?.data?.message || error.message));
    }
};
