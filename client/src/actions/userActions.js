import axios from 'axios';

import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';

export async function verifyUsers(token) {
    var data_success, data_error;
    // console.log("Server Token: " + token)
    await axios
        .get('/api/users/verify?token=' + token)
        .then(function (res) {
            // console.log(res);
            if (res.data.success) {
                setInStorage('react_login_app', { token: token });
                // console.log("Server End: " + token);
                data_success = res.data.success;
                data_error = res.data.message;
            };
        })
    const data = {
        success: data_success,
        message: data_error
    }
    // console.log(data);
    return data;
}

export async function signinUser(user) {
    var data_success, data_token, data_error;
    // console.log("Sign in" + "\nEmail: " + user.email + "\nPassword: " + user.password);
    await axios
        .post('/api/users/signin', user)
        .then(function (res) {
            // console.log(res);
            if (res.data.success) {
                setInStorage('react_login_app', { token: res.data.token });
                data_success = res.data.success;
                data_token = res.data.token;
                data_error = res.data.message;
            }
            else {
                data_success = res.data.success;
                data_error = res.data.message;
            }
        })
    const data = {
        success: data_success,
        token: data_token,
        message: data_error
    }
    // console.log(data);
    return data;
}

export async function addUser(newUser) {
    var data_success, data_error;
    await axios
        .post('/api/users/signup', newUser)
        .then(function (res) {
            // console.log(res);
            data_success = res.data.success;
            data_error = res.data.message;
        })
    const data = {
        success: data_success,
        message: data_error
    }
    // console.log(data);
    return data;
}

export async function logoutUsers() {
    const obj = getFromStorage('react_login_app');
    const { token } = obj;
    var data_success, data_error;
    // console.log("Server Token: " + token)
    await axios
        .get('/api/users/logout?token=' + token)
        .then(function (res) {
            // console.log(res);
            if (res.data.success) {
                // console.log("Server End: " + token);
                setInStorage('react_login_app', { token: '' });
                data_success = res.data.success;
                data_error = res.data.message;
            };
        })
    const data = {
        success: data_success,
        message: data_error
    }
    // console.log(data);
    return data;
}