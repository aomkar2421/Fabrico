import { api } from "../../config/apiConfig";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_USER_FAILURE, GET_ORDER_BY_USER_REQUEST, GET_ORDER_BY_USER_SUCCESS } from "./ActionType";

// export const createOrder = (reqData) => async (dispatch) => {
//     console.log("==========CREATE ORDER DATA========");
//     console.log("==========CREATE ORDER ADDRESS========", reqData);

//   dispatch({ type: CREATE_ORDER_REQUEST });
//   try {
//     const { data } = await api.post(`api/orders/`, reqData.address);
//     console.log("==========ORDER DATA========"+data);
//     if (data.id) {
//       reqData.navigate({ search: `step=3&order_id=${data.id}` });
//     }
//     console.log("created order - ", data);
//     dispatch({
//       type: CREATE_ORDER_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     console.log("catch error:" + error);
//     dispatch({
//       type: CREATE_ORDER_FAILURE,
//       payload: error.message,
//     });
//   }
// };

export const createOrder = (reqData) => async (dispatch) => {
  console.log("==========CREATE ORDER DATA========");
  console.log("==========CREATE ORDER ADDRESS========", reqData);

  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    // Extract the correct address object based on whether it's a new or existing address
    const addressToSend = reqData.address || reqData.newAddress;
    
    // Make sure we're passing just the address object to the API
    const { data } = await api.post(`api/orders/`, addressToSend);
    
    console.log("==========ORDER DATA========", data);
    
    if (data.id) {
      reqData.navigate({ search: `step=3&order_id=${data.id}` });
    }
    
    console.log("created order - ", data);
    
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error:", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message,
    });
  }
};


export const getOrderById = (orderId) => async(dispatch) => {
  dispatch({type:GET_ORDER_BY_ID_REQUEST});

  try {
      const {data} = await api.get(`/api/orders/${orderId}`);
      console.log("Order By Id - ", data);
      dispatch({type:GET_ORDER_BY_ID_SUCCESS, payload:data})
  } catch (error) {
      console.log("Catch error ", error);
      dispatch({type:GET_ORDER_BY_ID_FAILURE, payload:error.message});
  }

}

export const getOrderByUser = (orderId) => async(dispatch) => {
  dispatch({type:GET_ORDER_BY_USER_REQUEST});

  try {
    const jwt = localStorage.getItem("jwt");

    const {data} = await api.get(`/api/orders/user`, {
        headers:{
            "Authorization" : `Bearer ${jwt}`
        }
    });

      console.log("Order By User - ", data);
      dispatch({type:GET_ORDER_BY_USER_SUCCESS, payload:data})
  } catch (error) {
      console.log("Catch error ", error);
      dispatch({type:GET_ORDER_BY_USER_FAILURE, payload:error.message});
  }

}