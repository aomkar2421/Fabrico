import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from 'redux-thunk'
import { authReducer } from "./Auth/Reducer";
import { CustomerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { OrderReducer } from "./Order/Reducer";
import adminOrderReducer from "./Admin/Order/Reducer";
import { reviewReducer } from "./Review/Reducer";
import { RatingReducer } from "./Rating/Reducer";
import { AddressReducer } from "./Address/Reducer";

const rootReducers=combineReducers({
    auth:authReducer,
    products:CustomerProductReducer,
    cart:cartReducer,
    order:OrderReducer,
    adminOrder:adminOrderReducer,
    reviews:reviewReducer,
    ratings:RatingReducer,
    address:AddressReducer
})

export const store= legacy_createStore(rootReducers, applyMiddleware(thunk))