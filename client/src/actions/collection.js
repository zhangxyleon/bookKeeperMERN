import axios from 'axios';
import { GET_COLLECTION, CLEAR_COLLECTION, COLLECTION_ERROR, ADD_BOOKMARK, REMOVE_BOOKMARK } from './types';

//GET USER's collection
export const getCurrentCollection = () => async (dispatch) => {
	try {
		const res = await axios.get('/collections');
		console.log(res.data);
		dispatch({
			type: GET_COLLECTION,
			payload: res.data.set
		});
	} catch (err) {
		// dispatch({
		// 	type: COLLECTION_ERROR,
		// 	payload: { msg: err.response.statusText, status: err.response.status }
		// });
	}
};
// add bookmark
export const addBookmark = ({ name, url, tag }) => async (dispatch) => {
	console.log('get there');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const body = JSON.stringify({ name, url, tag });
		const res = await axios.post('/collections/set', body, config);
		dispatch({
			type: ADD_BOOKMARK,
			payload: res.data
		});
	} catch (err) {}
};
//remove one bookmark
export const removeBookmark = (bookmarkId) => async (dispatch) => {
	console.log('get there');
	try {
		const res = await axios.delete(`/collections/set/${bookmarkId}`);
		dispatch({
			type: REMOVE_BOOKMARK,
			payload: res.data
		});
	} catch (err) {
		console.log(err);
	}
};
