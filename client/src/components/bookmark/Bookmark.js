import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { setAlert } from '../../actions/alert';
import { getCurrentCollection, addBookmark, removeBookmark } from '../../actions/collection';
import Bookmarkshow from './Bookmarkshow';
import Bookmarkform from './Bookmarkform';
function RenderTags({ set, onClick }) {
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
		return (
			<li key={tags.indexOf(tag)}>
				<button className="tagbutton" onClick={onClick} value={tag}>
					{tag}
				</button>
			</li>
		);
	});
	return <Fragment>{Tagsli}</Fragment>;
}

function Bookmark({ auth, collection, getCurrentCollection, addBookmark, removeBookmark }) {
	//form state
	const [ formData, setFormData ] = useState({
		name: '',
		url: '',
		tag: 'unlabeled'
	});
	const { name, url, tag } = formData;
	// view(showbookmark or form)
	const [ viewData, setView ] = useState({
		view: 'show',
		viewtag: null
	});
	const { view, viewtag } = viewData;
	//redirect state
	const [ redirctTo, setRedirctTo ] = useState(false);
	// handle form
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		//console.log('addbookmark');
		addBookmark({ name, url, tag });
	};
	//set to form or show
	const onClick = (e) => {
		//console.log(e.target.value);
		setView({ ...viewData, view: e.target.value, viewtag: null });
	};
	//handle remove
	const remove = (e) => {
		//console.log(e.target.value, '111111');
		removeBookmark(e.target.value);
	};
	//show bookmarks of on tag
	const tagclick = (e) => {
		//console.log(e.target.value, '111111');
		setView({ ...viewData, view: 'show', viewtag: e.target.value });
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
							<RenderTags set={collection.collection} onClick={tagclick} />
							<li />
							<button className=" sidebutton " onClick={onClick} value="form">
								Add bookmark
							</button>
						</ul>
					</div>
					<div className="rightcontainer">
						{view === 'show' ? (
							<Bookmarkshow set={collection.collection} onClick={remove} tag={viewtag} />
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
