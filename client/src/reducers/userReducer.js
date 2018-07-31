import { GET_USERS, ADD_USER, SIGNIN_USER, VERIFY_USERS, LOGOUT_USERS, DELETE_USER, USERS_LOADING } from '../actions/types';

const initialState = {
    users: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            };
        case SIGNIN_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            };
        case VERIFY_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case LOGOUT_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}