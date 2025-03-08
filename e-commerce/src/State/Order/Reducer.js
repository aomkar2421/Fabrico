import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_USER_FAILURE, GET_ORDER_BY_USER_REQUEST, GET_ORDER_BY_USER_SUCCESS } from "./ActionType";

const initialState = { orders: [], order: null, error: null, loading: false };

export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: 
            return { ...state, error: null, loading: true };
        case CREATE_ORDER_SUCCESS: 
            return { ...state, loading: false, success: true, error: null, order: action.payload };
        case CREATE_ORDER_FAILURE: 
            return { ...state, loading: false, error: action.payload };
        case GET_ORDER_BY_ID_REQUEST: 
        case GET_ORDER_BY_USER_REQUEST:
            return { ...state, error: null, loading: true };
        case GET_ORDER_BY_ID_SUCCESS: 
            return { ...state, loading: false, error: null, order: action.payload };
        case GET_ORDER_BY_USER_SUCCESS:
            return { ...state, loading: false, error: null, orders: action.payload };
        case GET_ORDER_BY_ID_FAILURE: 
        case GET_ORDER_BY_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default: 
            return state;
    }
};
