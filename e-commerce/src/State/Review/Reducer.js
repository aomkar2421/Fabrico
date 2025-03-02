import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, GET_REVIEW_FAILURE, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS } from "./ActionType";


const initialState = {
    review: null,
    reviews:[],
    isLoading: false,
    error: null,
};

export const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_REVIEW_REQUEST:
        case GET_REVIEW_REQUEST:
            return { ...state, isLoading: true, error: null }
            case CREATE_REVIEW_SUCCESS:
                return { ...state, isLoading: false, error: null, review: action.payload }
            case GET_REVIEW_SUCCESS:
                return { ...state, isLoading: false, error: null, reviews: action.payload }
            case CREATE_REVIEW_FAILURE:
            case GET_REVIEW_FAILURE:
            return { ...state, isLoading: false, error:action.payload }
        default:
            return state;
    }
}
