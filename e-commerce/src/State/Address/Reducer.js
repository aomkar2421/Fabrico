import { GET_ADDRESS_BY_ORDER_FAILURE, GET_ADDRESS_BY_ORDER_REQUEST, GET_ADDRESS_BY_ORDER_SUCCESS, GET_ADDRESS_BY_USER_FAILURE, GET_ADDRESS_BY_USER_REQUEST, GET_ADDRESS_BY_USER_SUCCESS } from "./ActionType";


const initialState = { 
    addresses: [], 
    address: null, 
    error: null, 
    loading: false 
};

export const AddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDRESS_BY_ORDER_REQUEST: 
        case GET_ADDRESS_BY_USER_REQUEST:
            return { ...state, error: null, loading: true };
        case GET_ADDRESS_BY_ORDER_SUCCESS: 
            return { ...state, loading: false, error: null, address: action.payload };
        case GET_ADDRESS_BY_USER_SUCCESS:
            return { ...state, loading: false, error: null, addresses: action.payload };
        case GET_ADDRESS_BY_ORDER_FAILURE: 
        case GET_ADDRESS_BY_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default: 
            return state;
    }
};
