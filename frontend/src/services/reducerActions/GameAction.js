import * as AT from "./AuthTypes";
import {getAuthToken, setAuthHeader} from "../../api/axios";
import {redirect} from "react-router-dom";
import axios from 'axios';
import {GET_CHECK_JWT_URL, GET_GAME, POST_LOGIN_URL} from "../../api/urls";
import {LOAD_INITIAL_DATA, MOVE_CARD, USER_JOINED} from "../reducerRequestTypes/GameTypes";

export const loadInitialGameData = () => async (dispatch) => {
    dispatch(loadInitialGameDataRequest());
    try {
        const data = await axios.get(GET_GAME + '/' + params.gameUuid)
        setState(state => (
            {
                ...state,
                items: data.data.initialCards,
                columns: {
                    ...state.columns,
                    ['stolik']: {
                        ...state.columns['stolik'],
                        itemIds: data.data.initialCards.map(it => (it.id))
                    },
                }
            }
        ))
    } catch (error) {

    }
}

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
        console.log('RESPONSE DATA W LOGIN REQ: ', response.data);
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(failure());
        return Promise.reject(error);
    }
};

const loadInitialGameDataRequest = () => {
    return {
        type: LOAD_INITIAL_DATA,
    };
};


const loginRequest = () => {
    return {
        type: MOVE_CARD,
    };
};


const loginRequest = () => {
    return {
        type: USER_JOINED,
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        setAuthHeader(null);
        redirect("/");
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