import { Action } from "../../lib/types";
import { setLocalStorageData } from "../../lib/local-storage.lib";
import { 
	USER_LOGIN_REQUEST, 
	USER_LOGIN_SUCCESS, 
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST, 
	USER_REGISTER_SUCCESS, 
	USER_REGISTER_FAIL
} from "../../constants/authentication.constants";

function userLoginReducer(state = { }, action: Action<[]>) {
	switch(action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:{
			setLocalStorageData("user", action.payload);
			return { loading: false, user: action.payload };
		}
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.error };
		default:
			return state;
	}
}

function userRegisterReducer(state = { }, action: Action<[]>) {
	switch(action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:{
			return { loading: false, user: action.payload };
		}
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.error };
		default:
			return state;
	}
}

export {
	userLoginReducer
}