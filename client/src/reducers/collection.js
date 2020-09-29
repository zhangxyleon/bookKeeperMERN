import { GET_COLLECTION, CLEAR_COLLECTION, ADD_BOOKMARK, REMOVE_BOOKMARK, UPDATE_BOOKMARK } from '../actions/types';

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
		case UPDATE_BOOKMARK:
			return {
				...state,
				collection: payload,
				loading: false
			};
		case CLEAR_COLLECTION:
			return {
				...state,
				collection: []
			};
		default:
			return state;
	}
}
