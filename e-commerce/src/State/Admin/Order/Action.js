import { api } from "../../../config/apiConfig";
import { CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType";


export const getOrders = () => {
    // console.log("GET ALL ORDERS ---");
    return async (dispatch) => {
        dispatch({ type: GET_ORDERS_REQUEST });
        try {
            const response = await api.get(`/api/admin/orders/`);
            // console.log("GET ALL ORDERS RESPONSE ");
            dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("GET ALL ORDERS ERROR---", error);
            dispatch({ type: GET_ORDERS_FAILURE, payload: error.message })
        }
    }
}

export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDER_REQUEST });
    try {
        const response = await api.put(
            `/api/admin/orders/${orderId}/confirmed`
        );
        const data = response.data;
        console.log("confirm_order", data);
        dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message });
    }
};


// export const shipOrder = (orderId) => {
//     return async (dispatch) => {
//         dispatch({ type: SHIP_ORDER_REQUEST });
//         try {
//             const {data} = await api.put(
//                 `/api/admin/orders/${orderId}/ship`
//             );
//             console.log("shipped order", data);
//             dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
//         } catch (error) {
//             console.log("SHIP ORDERS ERROR---", error);
//             dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message })
//         }
//     }
// }

export const shipOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST });
    try {
        const response = await api.put(
            `/api/admin/orders/${orderId}/shiped`
        );
        const data = response.data;
        console.log("ORDER SHIPED DATA ", data);
        dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
    }
};


export const deliveredOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST });
    try {
        const response = await api.put(
            `/api/admin/orders/${orderId}/deliver`
        );
        const data = response.data;
        console.log("ORDER DELIVERED DATA ", data);
        dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
    }
};


// export const deleteOrder = (orderId) => {
//     return async (dispatch) => {
//         dispatch({ type: DELETE_ORDER_REQUEST });
//         try {
//             const {data} = await api.put(
//                 `/api/admin/orders/${orderId}/ship`
//             );
//             console.log("deleted order sucss", data);
//             dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
//         } catch (error) {
//             console.log("delete ORDERS ERROR---", error);
//             dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message })
//         }
//     }
// }

export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    try {
        const response = await api.delete(
            `/api/admin/orders/${orderId}/delete`
        );
        const data = response.data;
        console.log("ORDER DELETED DATA ", data);
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    }
};
