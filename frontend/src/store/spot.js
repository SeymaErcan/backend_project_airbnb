import { csrfFetch } from './csrf';

// constant to avoid debugging typos
const LOAD_SPOTS = 'spot/load_spots';
const LOAD_CURRENT_USER_SPOTS = 'spot/load_current_user_spots'
const ADD_SPOT = 'spot/add_spot';
const EDIT_SPOT = 'spot/edit_spot';
const REMOVE_SPOT = 'spot/remove_spot';
const ADD_IMAGE = 'spot/add_image';
const LOAD_DETAILS = 'spot/load_details';
const LOAD_REVIEWS = 'spot/load_reviews'

//regular action creator
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
};

const loadCurrentUserSpots = (spots) => {
    return {
        type: LOAD_CURRENT_USER_SPOTS,
        spots
    }
}

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
};

const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
};

const removeSpot = (spotId) => {
    return {
        type: REMOVE_SPOT,
        spotId
    }
}

const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image
    }
}

const loadDetails = (spotId) => {
    return {
        type: LOAD_DETAILS,
        spotId
    }
}

const loadReviews = (spotId) => {
    return {
        type: LOAD_REVIEWS,
        spotId
    }
}

// thunk action creator
export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data.Spots));
        return response;
    }
    console.log(response)
}

export const getCurrentUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadCurrentUserSpots(data.Spots));
        console.log("LOOK HERE >>", response)
        return response;
    }

}

export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            address, city, state, country, lat, lng, name, description, price
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addSpot(data));
        dispatch(getCurrentUserSpots());
        return data;
    }
}

export const updateSpot = (spotId, spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify({
            address, city, state, country, lat, lng, name, description, price
        })
    });

    if (res.ok) {
        const editedSpot = await res.json();
        dispatch(editSpot(editedSpot.spot));
        return editedSpot;
    }
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeSpot(spotId));
        dispatch(getCurrentUserSpots())
    }
}

export const postSpotImage = (image) => async (dispatch) => {
    const { spotId, url, preview } = image;
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({ url, preview })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addImage(data));
        return res;
    }
}

export const getSpotById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadDetails(spot));
        return spot;
    }
}

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadReviews(data.Reviews));
        return res;
    }
}


// reducer
// reducer
const initialState = {
    Spots: {},
    Reviews: {},
    Details: {}
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = { ...state };
            action.spots.forEach(spot => {
                newState.Spots[spot.id] = spot;
            });
            console.log(newState)
            return newState;
        }
        case LOAD_CURRENT_USER_SPOTS: {
            console.log("Before LOAD_DETAILS", state);
            const newState = { ...state };
            action.spots.forEach(spot => {
                newState.Spots[spot.id] = spot;
                console.log(newState)
            });
            console.log(newState)
            return newState;

        }
        case ADD_SPOT: {
            const newState = { ...state, Spots: { ...state.Spots, [action.spot.id]: action.spot } };
            return newState;
        }
        case EDIT_SPOT: {
            const newState = {
                ...state,
                Spots: { ...state.Spots, [action.spot.id]: action.spot }
            };
            return newState;
        }
        case REMOVE_SPOT: {
            const newState = { ...state };
            delete newState.Spots[action.spotId];
            return newState;
        }
        case LOAD_DETAILS: {
            return { ...state, Details: { ...state.Details, [action.spotId]: action.spot } };

        }
        case LOAD_REVIEWS: {
            return { ...state, Reviews: { ...state.Reviews, [action.spotId]: action.reviews } };
        }
        default:
            return state;
    }


};

export default spotReducer;
