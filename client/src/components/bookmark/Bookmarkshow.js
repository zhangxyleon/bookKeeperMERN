import React, { Fragment } from 'react';
import Moment from 'react-moment';
function RenderBookmark({ bookmark, remove }) {
	//console.log(bookmark);
	return (
		<tr className="item">
			<td className="small text-primary">{bookmark.name}-</td>

			<td>
				<a href={bookmark.url} target="_blank" rel="noopener noreferrer">
					{bookmark.url}
				</a>
			</td>
			<td style={{ color: '#28a745' }}>
				<span className="tag">#{bookmark.tag}</span>
			</td>
			<td className="small text-dark" style={{ float: 'right' }}>
				<Moment format="YYYY/MM/DD">{bookmark.date}</Moment>
			</td>
			<td>
				{' '}
				<button className="small text-primary" onClick={remove} value={bookmark._id}>
					remove
				</button>
			</td>
		</tr>
	);
}

function Bookmarkshow(props) {
	const bookmarks = props.set;
	const bookmarkList = bookmarks.map((bookmark) => {
		return <RenderBookmark bookmark={bookmark} key={bookmark._id} remove={props.onClick} />;
	});
	return (
		<Fragment>
			<h1 className="lead text-primary">Bookmark</h1>
			<table className="bookmarklist">
				<tbody>{bookmarkList}</tbody>
			</table>
		</Fragment>
	);
}
export default Bookmarkshow;
