import axios from 'axios';
import { GET_USERS, ADD_USER, SIGNIN_USER, VERIFY_USERS, LOGOUT_USERS, DELETE_USER, USERS_LOADING } from './types';

import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

export const getUsers = () => dispatch => {
    dispatch(setUsersLoading);
    axios
        .get('/api/users')
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        )
};

export const addUser = (user) => dispatch => {
    axios
        .post('/api/users/signup', user)
        .then(res => dispatch({
            type: ADD_USER,
            payload: res.data
        })
        )
};

// With middleware
// export const signinUser = (user) => dispatch => {
//     console.log("Sign in" + "\nEmail: " + user.email + "\nPassword: " + user.password);
//     axios
//         .post('/api/users/signin', user)
//         .then(function (res) {
//             console.log(res);
//             if (res.data.success) {
//                 setInStorage('react_login_app', { token: res.data.token });
//             };
//             dispatch({
//                 type: SIGNIN_USER,
//                 payload: res.data
//             })
//         })

// };
export function signinUser(user) {
    console.log("Sign in" + "\nEmail: " + user.email + "\nPassword: " + user.password);
    axios
        .post('/api/users/signin', user)
        .then(function (res) {
            console.log(res);
            if (res.data.success) {
                setInStorage('react_login_app', { token: res.data.token });
            };
        })
    // return new Promise(function (resolve) {
    //     axios
    //         .post('/api/users/signin', user)
    //         .then(function (res) {
    //             console.log(res);
    //             if (res.data.success) {
    //                 setInStorage('react_login_app', { token: res.data.token });
    //             };
    //             // The data from the request is available in a .then block
    //             // We return the result using resolve.
    //             resolve(res);
    //         });
    // });

};

// export const verifyUsers = (token) => dispatch => {
//     // dispatch(setUsersLoading);
//     console.log("server")
//     console.log(token);
//     axios
//         .get('/api/verify?token=' + token)
//         .then(res =>
//             dispatch({
//                 type: VERIFY_USERS,
//                 payload: res.data
//             })
//         )
// };

export function verifyUsers(token) {
    // dispatch(setUsersLoading);
    console.log("server")
    console.log(token);
    axios
        .get('/api/verify?token=' + token)
    // .then(res =>
    // )
};

export const logoutUsers = (token) => dispatch => {
    dispatch(setUsersLoading);
    axios
        .get('/api/logout?token=' + token)
        .then(res =>
            dispatch({
                type: LOGOUT_USERS,
                payload: res.data
            })
        )
};

export const deleteUser = (id) => dispatch => {
    axios
        .delete(`/api/users/${id}`).then(res =>
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        )
};

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    };
};