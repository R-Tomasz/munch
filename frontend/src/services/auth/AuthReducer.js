import {CHECK_JWT_REQUEST, FAILURE, LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS} from "./AuthTypes";

const initialState = {
    username: "",
    isLoggedIn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                ...initialState
            };
        case SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case FAILURE:
            return {
                ...state
            };
        case CHECK_JWT_REQUEST:
            return {
                ...state
            }
        default:
            return state;
    }
};

export default reducer;