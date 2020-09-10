import { Action, Product, CartProduct, State } from "../../library/types";
import { setLocalStorageData } from "../../library/local-storage.lib";

function cartDetailsReducer(state: State = { 
		cartProducts: [] 
	}, action: Action<CartProduct>) {
	switch(action.type) {
		case "CART_ADD_ITEM": {
			const cartProductIndex = state.cartProducts!.findIndex(
				(product: Product) => product._id === action.payload!._id
			);
			if(cartProductIndex === -1) {
				state.cartProducts = [ ...state.cartProducts, {
					_id: action.payload!._id,
					name: action.payload!.name,
					image: action.payload!.image,
					quantity: action.payload!.quantity,
					price: action.payload!.price,
					stock: action.payload!.stock
				} ];
			}
			else{
				state.cartProducts![cartProductIndex].quantity = action.payload!.quantity;
			}
			setLocalStorageData("cart", state.cartProducts);
			return {
				loading: false,
				cartProducts: state.cartProducts
			}
		}
		case "CART_REMOVE_ITEM": {
			const cartProduct = action.payload!;
			state.cartProducts = state.cartProducts!.filter(
				(product: Product) => product._id !== cartProduct._id
			);
			setLocalStorageData("cart", state.cartProducts);
			return {
				loading: false,
				cartProducts: state.cartProducts
			}
		}
		default:
			return state;
	}
}

export {
	cartDetailsReducer
}