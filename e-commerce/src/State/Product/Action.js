import { api, API_BASE_URL } from "../../config/apiConfig";
import { CREATE_PRODUCTS_FAILURE, CREATE_PRODUCTS_REQUEST, CREATE_PRODUCTS_SUCCESS, DELETE_PRODUCTS_FAILURE, DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const { data } = await api.get(
      `/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    console.log("====PRODUCTS DATA==== :", data)
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};


export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

  const { productId } = reqData;
  // console.log("====PRODUCT ID======="+productId);
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    console.log("========data=======", data)
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  console.log("CREATE PRODUCT DATA ", product);
  try {
    dispatch({ type: CREATE_PRODUCTS_REQUEST }); 

    const { data } = await api.post(`/api/admin/products/`, product);
    console.log("CREATED PRODUCT ", data);
    dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
  }
}

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });

    const { data } = await api.delete(`${API_BASE_URL}/api/admin/products/${productId}/delete`);
    console.log("DELETED PRODUCTS DATA ", data);
    dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message });
  }
}


