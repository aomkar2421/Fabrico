import { CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_RATING_FAILURE, GET_RATING_REQUEST, GET_RATING_SUCCESS, GET_RATING_FAILURE, GET_RATING_BY_USER_REQUEST, GET_RATING_BY_USER_SUCCESS, GET_RATING_BY_USER_FAILURE } from './ActionType';
import { api } from "../../config/apiConfig";

export const createRating = (ratingData) => async (dispatch) => {
  // console.log("CREATE RATING DATA ", ratingData);
  try {
    dispatch({ type: CREATE_RATING_REQUEST });
    const token = localStorage.getItem("jwt");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const ratingRequest = {
      productId: ratingData.productId,
      rating: ratingData.rating
    };

    const { data } = await api.post(`/api/ratings/create`, ratingRequest, config);
    // console.log("CREATED RATING ", data);

    dispatch({ type: CREATE_RATING_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_RATING_FAILURE, payload: error.message });
  }
}

export const getRatingById = (productId) => async (dispatch) => {
  dispatch({ type: GET_RATING_REQUEST });
  // console.log("GET RATING NY ID ACTION JS");
  try {
    const { data } = await api.get(`/api/ratings/product/${productId}`);
    // console.log("Rating By Id ACTION - ", data);
    dispatch({ type: GET_RATING_SUCCESS, payload: data })
    // console.log("GET RATING NY ID ACTION JS SUCCESS");
  } catch (error) {
    console.log("GET RATING NY ID ACTION JS FAILURE");
    console.log("Catch error ", error);
    dispatch({ type: GET_RATING_FAILURE, payload: error.message });
  }
}


export const getRatingByUser = (data) => async (dispatch) => {
  dispatch({ type: GET_RATING_BY_USER_REQUEST, meta: { userId: data.userId } });
  try {
    const { data: responseData } = await api.get(`/api/ratings/product/${data.productId}/user/${data.userId}`);
    dispatch({ 
      type: GET_RATING_BY_USER_SUCCESS, 
      payload: responseData,
      meta: { userId: data.userId } 
    });
  } catch (error) {
    console.log("Catch error ", error);
    dispatch({ 
      type: GET_RATING_BY_USER_FAILURE, 
      payload: error.message,
      meta: { userId: data.userId } 
    });
  }
}