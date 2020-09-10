import axios from "axios";

import { BASE_URL } from "../../constants/server.constants";
import { Product } from "../../library/types";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL
} from "../../constants/authentication.constants";

const loginUser = (email: string, password: string) => 
	async (dispatch: any) => {
		try {
			
			dispatch({
				type: USER_LOGIN_REQUEST,
				payload: {
					email,
					password
				}
			});
			const { data } = await axios.post(BASE_URL+"/api/auth/login", {
				email,
				password
			});
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data
			});
		} catch(error) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: error.message
			});
		}
	}

const registerUser = (name: string, email: string, password: string) => 
	async (dispatch: any) => {
		try {
			
			dispatch({
				type: USER_REGISTER_REQUEST,
				payload: {
					email,
					password
				}
			});
			const { data } = await axios.post(BASE_URL+"/api/auth/register", {
				name,
				email,
				password
			});
			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: data
			});
		} catch(error) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: error.message
			});
		}
	}

export {
	loginUser,
	registerUser
}