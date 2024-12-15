import { API_BASE_URL } from "../../config/apiConfig";
import axios from axios;
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const registerRequest = () => ({type:REGISTER_REQUEST});
const registerSuccess = (user) => ({type:REGISTER_SUCCESS, payload:user});
const registerFailure = (error) => ({type:REGISTER_FAILURE, error});

export const register =(userData)=>async(dispatch)=>{
    dispatch(registerRequest);

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        if(user.jwt){
            localStorage.setItem("jwt", user.jwt);
        }
        dispatch(registerSuccess);
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
}
