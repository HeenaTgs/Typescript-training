import {
    FETCH_LOGIN_FAILURE,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_REQUEST,
    FETCH_REGISTER_REQUEST,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_FAILURE,
} from './types';

type Login = {
    token?: string;
}

type AuthState = {
    loading: boolean;
    login: Login;
    register: {};
    error: string | null;
}

type Action = {
    type: string;
    payload: any;
}

const INITIAL_STATE: AuthState = {
    loading: false,
    login: {},
    register: {},
    error: null
};

const reducer = (state: AuthState = INITIAL_STATE, action: Action): AuthState => {
    switch (action.type) {
        case FETCH_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                login: action.payload,
                error: null
            };
        case FETCH_LOGIN_FAILURE:
            return {
                ...state,
                login: {},
                error: action.payload
            };
        case FETCH_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_REGISTER_SUCCESS:
            return {
                ...state,
                register: action.payload,
                error: null
            };
        case FETCH_REGISTER_FAILURE:
            return {
                ...state,
                register: {},
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
