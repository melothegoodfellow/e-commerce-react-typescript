import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { productListReducer, productDetailsReducer } from "./reducers/product.reducers";
import { cartDetailsReducer } from "./reducers/cart.reducers";
import { userLoginReducer } from "./reducers/authentication.reducers";
import { getLocalStorageData } from "../library/local-storage.lib";

const initialState: any = {
	products: [],
	cartProducts: getLocalStorageData("cart") || [],
	user: getLocalStorageData("user") || {}
};
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cartDetails: cartDetailsReducer,
	userDetails: userLoginReducer
});

const composeEnchancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)));

export default store;