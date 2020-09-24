import { GET_COLLECTION, CLEAR_COLLECTION, COLLECTION_ERROR, ADD_BOOKMARK, REMOVE_BOOKMARK } from '../actions/types';

const initialState = {
	collection: [],
	loading: true,
	err: []
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_COLLECTION:
		case ADD_BOOKMARK:
		case REMOVE_BOOKMARK:
			return {
				...state,
				collection: payload,
				loading: false
			};
		case COLLECTION_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				collection: null
			};
		case CLEAR_COLLECTION:
			return {
				...state,
				collection: null
			};
		default:
			return state;
	}
}
