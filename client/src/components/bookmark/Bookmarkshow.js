import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import Modalform from './Modalform';
function RenderBookmark({ bookmark, remove, edit, close }) {
	//console.log(bookmark);
	return (
		<tr className="item">
			<td>
				<span className="small text-green">{bookmark.name}</span>
			</td>

			<td>
				<a href={bookmark.url} target="_blank" rel="noopener noreferrer">
					{bookmark.url}
				</a>
			</td>
			<td style={{ color: '#28a745' }}>
				<span className="tag">#{bookmark.tag}</span>
			</td>
			<td style={{ width: '100px' }}>
				<Moment format="YYYY/MM/DD" className="small text-dark">
					{bookmark.date}
				</Moment>
			</td>
			<td style={{ width: '50px' }}>
				{' '}
				<button className="listbutton" onClick={edit} value={bookmark._id}>
					edit
				</button>
			</td>
			<td>
				{' '}
				<button
					className="listbutton"
					onClick={(e) => {
						close(e);
						remove(e);
					}}
					value={bookmark._id}
				>
					remove
				</button>
			</td>
		</tr>
	);
}

function Bookmarkshow(props) {
	// state for how to sorting
	const [ sortData, setSort ] = useState({
		sort: 'time'
	});
	const { sort } = sortData;
	//state for show editor modal
	const [ modalData, setModal ] = useState({
		modal: null,
		bookmarkToEdit: null
	});
	const { modal, bookmarkToEdit } = modalData;
	let bookmarks = props.set;
	if (props.tag != null) {
		bookmarks = bookmarks.filter(({ tag }) => {
			return tag === props.tag;
		});
	}

	//onclick for sort button
	const sortby = (e) => {
		setSort({ ...sortData, sort: e.target.value });
	};
	//onclick for editbutton
	const edit = (e) => {
		setModal({ ...modalData, modal: true, bookmarkToEdit: e.target.value });
	};
	//close modal
	const close = (e) => {
		setModal({ ...modalData, modal: null, bookmarkToEdit: null });
	};
	const removewithclose = (e) => {
		if (e.target.value === bookmarkToEdit) {
			setModal({ ...modalData, modal: null, bookmarkToEdit: null });
		}
	};
	//sort bookmarks
	if (sort === 'time') {
		bookmarks.sort((a, b) => {
			const timea = new Date(a.date);
			const timeb = new Date(b.date);
			return timeb - timea;
		});
	} else if (sort === 'name') {
		bookmarks.sort((a, b) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;
		});
	} else {
		bookmarks.sort((a, b) => {
			const nameA = a.tag.toUpperCase();
			const nameB = b.tag.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;
		});
	}
	const bookmarkList = bookmarks.map((bookmark) => {
		return (
			<RenderBookmark
				bookmark={bookmark}
				key={bookmark._id}
				remove={props.onClick}
				edit={edit}
				close={removewithclose}
			/>
		);
	});
	return (
		<Fragment>
			<div style={{ height: '38px' }}>
				<h1 className="lead text-primary" style={{ float: 'left' }}>
					Bookmark
				</h1>
				<div className="dropdown">
					<button className="dropbtn">sort by</button>
					<div className="dropdown-content">
						<button value="time" onClick={sortby}>
							time
						</button>
						<button value="name" onClick={sortby}>
							name
						</button>
						<button value="tag" onClick={sortby}>
							tag
						</button>
					</div>
				</div>
			</div>

			<table className="bookmarklist" style={{ width: '800px' }}>
				<tbody>{bookmarkList}</tbody>
			</table>
			{modal ? <Modalform bookmarkId={bookmarkToEdit} close={close} /> : null}
		</Fragment>
	);
}
export default Bookmarkshow;
