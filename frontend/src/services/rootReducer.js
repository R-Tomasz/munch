import {combineReducers} from "redux";
import userReducer from "./user/UserReducer";
import authReducer from "./auth/AuthReducer";
import gameReducer from "./reducers/GameReducer";

const rootReducer = combineReducers({
    // user: userReducer,
    auth: authReducer,
    game: gameReducer,
});

export default rootReducer;