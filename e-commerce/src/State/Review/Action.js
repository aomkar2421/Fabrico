import { api } from "../../config/apiConfig";
import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, GET_REVIEW_FAILURE, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS } from "./ActionType";

export const createReview = (reviewData) => async (dispatch) => {
  console.log("CREATE REVIEW DATA ", reviewData);
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    const token = localStorage.getItem("jwt"); 

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const reviewRequest = {
      productId: reviewData.productId, 
      review: reviewData.review
    };

    const { data } = await api.post(`/api/reviews/create`, reviewRequest, config);
    console.log("CREATED REVIEW ", data);

    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.message });
  }
}


export const getReviewById = (productId) => async(dispatch) => {
    dispatch({type:GET_REVIEW_REQUEST});
    console.log("GET REVIEWS NY ID ACTION JS");
    try {
        const {data} = await api.get(`/api/reviews/product/${productId}`);
        console.log("Reviews By Id ACTION - ", data);
        dispatch({type:GET_REVIEW_SUCCESS, payload:data})

      } catch (error) {
      console.log("GET REVIEWS NY ID ACTION JS FAILURE");
        console.log("Catch error ", error);
        dispatch({type:GET_REVIEW_FAILURE, payload:error.message});
    }
}