import React, { useState } from 'react';
import { updateBookmark } from '../../actions/collection';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Modalform({ bookmarkId, close, updateBookmark, collection }) {
	const [ formData, setFormData ] = useState({
		name: '',
		url: '',
		tag: 'unlabeled'
	});
	const { name, url, tag } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		//console.log('addbookmark');
		updateBookmark({ name, url, tag, bookmarkId });
		close();
	};
	//const bookmark = collection.collection.filter((b) => (b._id = bookmarkId))[0];
	return (
		<div className="Modal">
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<input type="name" placeholder="Name" name="name" onChange={onChange} required />
				</div>
				<div className="form-group">
					<input type="url" placeholder="Location (URL)" name="url" onChange={onChange} required />
				</div>
				<div className="form-group">
					<input type="tags" placeholder="tags" name="tag" onChange={onChange} />
				</div>
				<input type="submit" className="btn btn-primary" value="Update bookmark" />
				<button type="button" className="btn btn-danger" onClick={close}>
					close
				</button>
			</form>
		</div>
	);
}
Modalform.propTypes = {
	updateBookmark: PropTypes.func.isRequired,
	collection: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	collection: state.collection
});
export default connect(mapStateToProps, { updateBookmark })(Modalform);
