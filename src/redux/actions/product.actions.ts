import axios from "axios";

import { 
	PRODUCT_LIST_REQUEST, 
	PRODUCT_LIST_SUCCESS, 
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST, 
	PRODUCT_DETAILS_SUCCESS, 
	PRODUCT_DETAILS_FAIL
} from "../../constants/product.constants";
import { BASE_URL } from "../../constants/server.constants";

const listProducts = () => async (dispatch: any) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get(BASE_URL+"/api/products");

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch(error) {
		dispatch({ type: PRODUCT_LIST_FAIL, payload: error });
	}
}

const detailsProduct = (productId: string) => async (dispatch: any) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId});
		const { data } = await axios.get(BASE_URL+"/api/products/"+productId);

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch(error) {
		dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error });
	}
}

export {
	listProducts,
	detailsProduct
}