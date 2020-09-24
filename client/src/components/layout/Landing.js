import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to="/Bookmark" />;
	}
	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Book Keeper</h1>
					<p className="lead">Create your bookmarks collection</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">
							Sign Up
						</Link>
						<Link to="/login" className="btn btn-light">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);