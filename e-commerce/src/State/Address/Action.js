import { api } from "../../config/apiConfig";
import { GET_ADDRESS_BY_ORDER_FAILURE, GET_ADDRESS_BY_ORDER_REQUEST, GET_ADDRESS_BY_ORDER_SUCCESS, GET_ADDRESS_BY_USER_FAILURE, GET_ADDRESS_BY_USER_REQUEST, GET_ADDRESS_BY_USER_SUCCESS } from "./ActionType";


export const getAddressByOrder = (orderId) => async(dispatch) => {
  dispatch({type:GET_ADDRESS_BY_ORDER_REQUEST});

  try {
      const {data} = await api.get(`/api/addresses/order/${orderId}`);
      console.log("Address by order - ", data);
      dispatch({type:GET_ADDRESS_BY_ORDER_SUCCESS, payload:data})
  } catch (error) {
      console.log("Catch error ", error);
      dispatch({type:GET_ADDRESS_BY_ORDER_FAILURE, payload:error.message});
  }

}

export const getAddressByUser = (orderId) => async(dispatch) => {
  dispatch({type:GET_ADDRESS_BY_USER_REQUEST});

  try {
    const jwt = localStorage.getItem("jwt");

    const {data} = await api.get(`/api/addresses/user`, {
        headers:{
            "Authorization" : `Bearer ${jwt}`
        }
    });

      console.log("Order By User - ", data);
      dispatch({type:GET_ADDRESS_BY_USER_SUCCESS, payload:data})
  } catch (error) {
      console.log("Catch error ", error);
      dispatch({type:GET_ADDRESS_BY_USER_FAILURE, payload:error.message});
  }

}