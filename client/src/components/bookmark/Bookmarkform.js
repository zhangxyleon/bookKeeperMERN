import React, { Fragment } from 'react';

export const Bookmarkform = (props) => {
	return (
		<Fragment>
			<h1 className="large text-primary">Add a bookmark</h1>
			<form className="form" onSubmit={props.onSubmit}>
				<div className="form-group">
					<input type="name" placeholder="Name" name="name" onChange={props.onChange} required />
				</div>
				<div className="form-group">
					<input type="url" placeholder="Location (URL)" name="url" onChange={props.onChange} required />
				</div>
				<div className="form-group">
					<input type="tags" placeholder="Tags" name="tag" onChange={props.onChange} />
				</div>
				<input type="submit" className="btn btn-primary" value="Add bookmark" />
			</form>
		</Fragment>
	);
};

export default Bookmarkform;
