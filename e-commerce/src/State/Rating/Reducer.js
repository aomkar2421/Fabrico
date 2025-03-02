import {
    CREATE_RATING_FAILURE,
    CREATE_RATING_REQUEST,
    CREATE_RATING_SUCCESS,
    GET_RATING_BY_USER_FAILURE,
    GET_RATING_BY_USER_REQUEST,
    GET_RATING_BY_USER_SUCCESS,
    GET_RATING_FAILURE,
    GET_RATING_REQUEST,
    GET_RATING_SUCCESS
} from "./ActionType";

const initialState = {
    rating: null,
    userRatings: {}, // Changed from userRating to userRatings object
    ratings: [],
    isLoading: false,
    loadingUserRatings: {}, // Track loading state for each user
    error: null,
    errors: {}, // Track errors for each user
};

export const RatingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RATING_REQUEST:
        case GET_RATING_REQUEST:
            return { ...state, isLoading: true, error: null }

        case GET_RATING_BY_USER_REQUEST:
            return {
                ...state,
                loadingUserRatings: {
                    ...state.loadingUserRatings,
                    [action.meta.userId]: true
                },
                errors: {
                    ...state.errors,
                    [action.meta.userId]: null
                }
            }

        case CREATE_RATING_SUCCESS:
            return { ...state, isLoading: false, error: null, rating: action.payload }

        case GET_RATING_SUCCESS:
            return { ...state, isLoading: false, error: null, ratings: action.payload }

        case GET_RATING_BY_USER_SUCCESS:
            return {
                ...state,
                loadingUserRatings: {
                    ...state.loadingUserRatings,
                    [action.meta.userId]: false
                },
                errors: {
                    ...state.errors,
                    [action.meta.userId]: null
                },
                userRatings: {
                    ...state.userRatings,
                    [action.meta.userId]: action.payload
                }
            }

        case CREATE_RATING_FAILURE:
        case GET_RATING_FAILURE:
            return { ...state, isLoading: false, error: action.payload }

        case GET_RATING_BY_USER_FAILURE:
            return {
                ...state,
                loadingUserRatings: {
                    ...state.loadingUserRatings,
                    [action.meta.userId]: false
                },
                errors: {
                    ...state.errors,
                    [action.meta.userId]: action.payload
                }
            }

        default:
            return state;
    }
}