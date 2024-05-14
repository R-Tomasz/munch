import axios from 'axios';
import {GET_REFRESH_TOKEN} from "./urls";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setAuthHeader = (token) => {
    localStorage.setItem('auth_token', token);
};

export const getAuthToken = () => {
    return localStorage.getItem('auth_token');
};

axios.interceptors.request.use(
    async (config) => {
        const token = getAuthToken();
        if (getAuthToken() !== null && getAuthToken() !== "null") {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axios.interceptors.response.use(async function (response) {
    return response;
}, async function (error) {
    if (error.response.status === 401 && getAuthToken() !== null && getAuthToken() !== "null") {
        try {
            const refresh = await refreshToken();
            setAuthHeader(refresh.data.token);
            error.config.headers["Authorization"] = `Bearer ${getAuthToken()}`;
            error.config.headers["Access-Control-Allow-Credentials"] = 'true';
            return axios(error.config);
        } catch (err) {
            console.log(err);
        }
    }
    if (error.response.status === 404 || error.response.status === 400) {
        window.location = '/';
    }
    if (error.response.status === 403) {
        window.location = '/login';
    }
    return Promise.reject(error);
});

const refreshToken = async () => {
    try {
        return await axios.get(GET_REFRESH_TOKEN);
    } catch (err) {
        console.log('error', err)
    }
};