// import { API_BASE_URL } from "../../config/apiConfig";
// import axios from 'axios';
// import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
// import { toast } from "react-toastify";

// const token = localStorage.getItem("jwt");

// const registerRequest = () => ({type:REGISTER_REQUEST});
// const registerSuccess = (user) => ({type:REGISTER_SUCCESS, payload:user});
// const registerFailure = (error) => ({type:REGISTER_FAILURE, payload:error});

// export const register =(userData)=>async(dispatch)=>{
//     dispatch(registerRequest());
  
//     try {
//         const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
//         const user = response.data;
//         if(user.jwt){
//             localStorage.setItem("jwt", user.jwt);
//         }
//         console.log("user "+user);
//         dispatch(registerSuccess(user.jwt));
//         toast("Register Succesfully")
//     } catch (error) {
//         dispatch(registerFailure(error.message));
//         toast("something went wrong")
//     }
// }



// const loginRequest = () => ({type:LOGIN_REQUEST});
// const loginSuccess = (user) => ({type:LOGIN_SUCCESS, payload:user});
// const loginFailure = (error) => ({type:LOGIN_FAILURE, payload:error});

// export const login =(userData)=>async(dispatch)=>{
//     dispatch(loginRequest());

//     try {
//         const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
//         const user = response.data;
//         if(user.jwt){
//             localStorage.setItem("jwt", user.jwt);
//         }
//         console.log("USER LOGGED IN SUCCESFULLY "+user.jwt)
//         dispatch(loginSuccess(user.jwt));
//         toast("Login Succesfully")
//     } catch (error) {
//         console.log("ERROR WHILE USER TRIED LOGGED IN "+error)
//         dispatch(loginFailure(error.message));
//         toast("something went wrong")
//     }
// }  



// const getUserRequest = () => ({type:GET_USER_REQUEST});
// const getUserSuccess = (user) => ({type:GET_USER_SUCCESS, payload:user});
// const getUserFailure = (error) => ({type:GET_USER_FAILURE, payload:error});

// export const getUser =(jwt)=>async(dispatch)=>{
//     // console.log("=======TRYING TO GET USER DATA ACTION.JS==========");
//     dispatch(getUserRequest());

//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
//             headers:{
//                 "Authorization" : `Bearer ${jwt}`
//             }
//         });
//         const user = response.data;
//         // console.log("=======GETTING USER DATA ACTION.JS======== ",user);

//         dispatch(getUserSuccess(user));
//     } catch (error) {
//         // console.log("=======ERROR GETTING USER DATA ACTION.JS======== ",error);
//         dispatch(getUserFailure(error.message));
//     }
// }

// export const logout = () =>(dispatch)=>{
//     dispatch({type:LOGOUT, payload:null});
//     localStorage.clear();
//     toast("Logged Out Succesfully")
// }




import { API_BASE_URL } from "../../config/apiConfig";
import axios from 'axios';
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { toast } from "react-toastify";

const token = localStorage.getItem("jwt");

const registerRequest = () => ({type:REGISTER_REQUEST});
const registerSuccess = (user) => ({type:REGISTER_SUCCESS, payload:user});
const registerFailure = (error) => ({type:REGISTER_FAILURE, payload:error});

export const register = (userData) => async(dispatch) => {
    dispatch(registerRequest());
  
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        if(user.jwt){
            localStorage.setItem("jwt", user.jwt);
        }
        console.log("user "+user);
        dispatch(registerSuccess(user.jwt));
        toast.success("Registered Successfully");
    } catch (error) {
        // Handle specific registration errors
        let errorMessage = "Registration failed";
        
        if (error.response) {
            // Get specific error message from the backend if available
            const statusCode = error.response.status;
            const responseData = error.response.data;
            
            if (responseData && responseData.message) {
                if (responseData.message.includes("Email already used")) {
                    errorMessage = "Email already registered. Please use a different email.";
                } else {
                    errorMessage = responseData.message;
                }
            } else if (statusCode === 400) {
                errorMessage = "Invalid registration details";
            } else if (statusCode === 409) {
                errorMessage = "Email already registered";
            }
        }
        
        dispatch(registerFailure(errorMessage));
        toast.error(errorMessage);
    }
}

const loginRequest = () => ({type:LOGIN_REQUEST});
const loginSuccess = (user) => ({type:LOGIN_SUCCESS, payload:user});
const loginFailure = (error) => ({type:LOGIN_FAILURE, payload:error});

export const login = (userData) => async(dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = response.data;
        
        // Only consider login successful if we have a JWT
        if(user && user.jwt) {
            localStorage.setItem("jwt", user.jwt);
            console.log("USER LOGGED IN SUCCESSFULLY: "+user.jwt);
            dispatch(loginSuccess(user.jwt));
            toast.success("Login Successful");
        } else {
            // If we don't get a JWT, consider it a failure
            const errorMsg = "Login failed: Authentication error";
            console.log(errorMsg);
            dispatch(loginFailure(errorMsg));
            toast.error(errorMsg);
        }
    } catch (error) {
        console.log("ERROR WHILE USER TRIED TO LOG IN: ", error);
        
        // Handle specific login errors with appropriate messages
        let errorMessage = "Invalid credentials";
        
        if (error.response) {
            const statusCode = error.response.status;
            const responseData = error.response.data;
            
            if (responseData && responseData.message) {
                // Parse specific error messages from backend
                if (responseData.message.includes("Invalid Username")) {
                    errorMessage = "Email address not registered";
                } else if (responseData.message.includes("Invalid Password")) {
                    errorMessage = "Incorrect password";
                } else {
                    errorMessage = responseData.message;
                }
            } else if (statusCode === 401) {
                errorMessage = "Invalid email or password";
            } else if (statusCode === 404) {
                errorMessage = "Account not found";
            }
        } else if (error.request) {
            // Network error
            errorMessage = "Unable to connect to server. Please check your internet connection.";
        }
        
        dispatch(loginFailure(errorMessage));
        toast.error(errorMessage);
    }
}  

const getUserRequest = () => ({type:GET_USER_REQUEST});
const getUserSuccess = (user) => ({type:GET_USER_SUCCESS, payload:user});
const getUserFailure = (error) => ({type:GET_USER_FAILURE, payload:error});

export const getUser = (jwt) => async(dispatch) => {
    dispatch(getUserRequest());

    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers:{
                "Authorization" : `Bearer ${jwt}`
            }
        });
        const user = response.data;
        dispatch(getUserSuccess(user));
    } catch (error) {
        let errorMessage = "Failed to fetch user profile";
        
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        
        dispatch(getUserFailure(errorMessage));
    }
}

export const logout = () => (dispatch) => {
    dispatch({type:LOGOUT, payload:null});
    localStorage.clear();
    toast.success("Logged Out Successfully");
}