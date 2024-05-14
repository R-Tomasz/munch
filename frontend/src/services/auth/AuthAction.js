import * as AT from "./AuthTypes";
import {getAuthToken, setAuthHeader} from "../../api/axios";
import {redirect} from "react-router-dom";
import axios from 'axios';
import {GET_CHECK_JWT_URL, POST_LOGIN_URL} from "../../api/urls";

export const authenticateUser = (username, password) => async (dispatch) => {

    dispatch(loginRequest());

    try {
        const response = await axios.post(POST_LOGIN_URL, {
            username: username,
            password: password,
        });
        if (response.data.token !== null) {
            setAuthHeader(response.data.token);
            dispatch(success({
                username: response.data.username,
                isLoggedIn: true
            }));
        }
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(failure());
        return Promise.reject(error);
    }
};

const loginRequest = () => {
    return {
        type: AT.LOGIN_REQUEST,
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        setAuthHeader(null);
        redirect("/");
    };
};

const logoutRequest = () => {
    return {
        type: AT.LOGOUT_REQUEST,
    };
};

export const checkJwtToken = () => async (dispatch) => {

    if (getAuthToken() === null || getAuthToken() === "null") {
        return;
    }
    dispatch(checkJwtTokenRequest());
    await axios.get(GET_CHECK_JWT_URL).then((res) => {
        if (res.data.token !== null) {
            dispatch(success({
                username: res.data.username,
                isLoggedIn: true
            }));
        }
        return Promise.resolve(res.data);
    }).catch((err) => {
        dispatch(failure());
    });
}

const checkJwtTokenRequest = () => {
    return {
        type: AT.CHECK_JWT_REQUEST
    };
};

export const success = (isLoggedIn) => {
    return {
        type: AT.SUCCESS,
        payload: isLoggedIn,
    };
};

const failure = () => {
    return {
        type: AT.FAILURE
    };
};