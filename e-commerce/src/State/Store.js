import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from 'redux-thunk'
import { authReducer } from "./Auth/Reducer";
import { CustomerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { OrderReducer } from "./Order/Reducer";
import adminOrderReducer from "./Admin/Order/Reducer";

const rootReducers=combineReducers({
    auth:authReducer,
    products:CustomerProductReducer,
    cart:cartReducer,
    order:OrderReducer,
    adminOrder:adminOrderReducer
})

export const store= legacy_createStore(rootReducers, applyMiddleware(thunk))