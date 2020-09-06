import { BASE_URL } from "../../constants/server.constants";
import { Product } from "../../lib/types";
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM
} from "../../constants/cart.constants";

const addToCart = 
	(product: Product, quantity: number) => 
		async (dispatch: any) => {
			try {
				
				dispatch({
					type: CART_ADD_ITEM,
					payload: {
						_id: product._id,
						name: product.name,
						image: product.image,
						quantity: quantity,
						price: product.price,
						stock: product.stock
					}
				});
			} catch(error) {

			}
		}

const removeFromCart = (productId: string) => async (dispatch: any) => {
	try {

		dispatch({
			type: CART_REMOVE_ITEM,
			payload: {
				_id: productId
			}
		});
	} catch(error) {

	}
}

export {
	addToCart,
	removeFromCart
}