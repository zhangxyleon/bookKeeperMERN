import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_COLLECTION
} from '../actions/types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
//Load User export
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/users');
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

//Register
export const register = ({ email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post('/users/signup', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
		dispatch(loadUser());
	} catch (err) {
		const msg = JSON.parse(err.request.response);
		dispatch(setAlert(msg.err.message, 'danger'));
		dispatch({
			type: REGISTER_FAIL
		});
	}
};

//login
export const login = ({ email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post('/users/login', body, config);
		const payload = { token: res.data.token };
		dispatch({
			type: LOGIN_SUCCESS,
			payload: payload
		});
		dispatch(loadUser());
	} catch (err) {
		const msg = JSON.parse(err.request.response);
		dispatch(setAlert(msg.err.message, 'danger'));
		dispatch({
			type: LOGIN_FAIL
		});
	}
};
//logout
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
	dispatch({ type: CLEAR_COLLECTION });
};
