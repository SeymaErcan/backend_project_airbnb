import { csrfFetch } from "./csrf"

const ADD_USER = 'session/addUser';
const REMOVE_USER = 'session/removeUSer'

// Action creator
const addUser = (payload) => ({
    type: ADD_USER,
    payload
});

const removeUser = () => ({
    type: REMOVE_USER
})

// Thunk action for login
export const login = ({ credential, password }) => async (dispatch) => {
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })  // Fix the typo in "password"
    });

    if (res.ok) {
        res = await res.json();
        dispatch(addUser(res));  // Fix the case in "addUser"
        return res;
    }
};

// Initial state
const initialState = { user: null };

// Reducer function
const session = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER: {
            const newState = { ...state };
            newState.user = action.payload;
            return newState
        }
        case REMOVE_USER: {
            return { ...state, ...initialState }
        }

        default:
            return state;
    }
};

export default session;
