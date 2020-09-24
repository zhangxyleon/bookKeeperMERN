import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { setAlert } from '../../actions/alert';
import { getCurrentCollection, addBookmark, removeBookmark } from '../../actions/collection';
import Bookmarkshow from './Bookmarkshow';
import Bookmarkform from './Bookmarkform';
function RenderTags({ set }) {
	if (set.length < 1) {
		return <div>{'  '}</div>;
	}
	const tags = [];
	for (let i = 0; i < set.length; i++) {
		if (!tags.includes(set[i].tag)) {
			tags.push(set[i].tag);
		}
	}
	const Tagsli = tags.map((tag) => {
		return <li key={tags.indexOf(tag)}>{tag}</li>;
	});
	return <Fragment>{Tagsli}</Fragment>;
}

function Bookmark({ auth, collection, getCurrentCollection, addBookmark, removeBookmark }) {
	//form state
	const [ formData, setFormData ] = useState({
		name: '',
		url: '',
		tag: 'unlabled'
	});
	const { name, url, tag } = formData;
	// view(showbookmark or form)
	const [ viewData, setView ] = useState({
		view: 'show'
	});
	const { view } = viewData;
	//redirect state
	const [ redirctTo, setRedirctTo ] = useState(false);
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		console.log('addbookmark');
		addBookmark({ name, url, tag });
	};
	const onClick = (e) => {
		console.log(e.target.value);
		setView({ ...view, view: e.target.value });
	};
	const remove = (e) => {
		console.log(e.target.value, '111111');
		removeBookmark(e.target.value);
	};
	useEffect(
		() => {
			if (!auth.isAuthenticated) {
				setRedirctTo(true);
			} else {
				getCurrentCollection();
			}
		},
		[ getCurrentCollection, auth.isAuthenticated ]
	);
	if (redirctTo) {
		return <Redirect to="/" />;
	}
	//console.log(collection.collection.lengtsh);
	return (
		<Fragment>
			<section className="container">
				<div className="bookmark">
					<div className="sidenav">
						<ul>
							<li>
								<button className="sidebutton  " onClick={onClick} value="show">
									Bookmarks
								</button>
							</li>
							<RenderTags set={collection.collection} />
							<li />
							<button className=" sidebutton " onClick={onClick} value="form">
								Add bookmark
							</button>
						</ul>
					</div>
					<div className="rightcontainer">
						{view === 'show' ? (
							<Bookmarkshow set={collection.collection} onClick={remove} />
						) : (
							<Bookmarkform onSubmit={onSubmit} onChange={onChange} />
						)}
					</div>
				</div>
			</section>
		</Fragment>
	);
}

Bookmark.propTypes = {
	auth: PropTypes.object.isRequired,
	collection: PropTypes.object.isRequired,
	getCurrentCollection: PropTypes.func.isRequired,
	addBookmark: PropTypes.func.isRequired,
	removeBookmark: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	collection: state.collection
});
export default connect(mapStateToProps, { getCurrentCollection, addBookmark, removeBookmark })(Bookmark);
