import {LOAD_INITIAL_DATA, MOVE_CARD, USER_JOINED} from "../reducerRequestTypes/GameTypes";

const cols = {
    'column-1': {
        id: 'column-1',
        username: '',
        itemIds: [],
    },
    'column-2': {
        id: 'column-2',
        username: '',
        itemIds: [],
    },
    'stolik': {
        id: 'stolik',
        itemIds: [],
    }
}

const initialState = {
    items: [],
    columns: cols,
    columnOrder: ['column-1', 'column-2', 'stolik'],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INITIAL_DATA:
            return {
                ...state
            }
        case MOVE_CARD:
            return {
                ...state,
                ...initialState
            };
        case USER_JOINED:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export default reducer;