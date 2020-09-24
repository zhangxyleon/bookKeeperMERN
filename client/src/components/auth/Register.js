import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { register } from '../../actions/auth';
const Register = ({ setAlert, register, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: '',
		password2: ''
	});
	const { email, password, password2 } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ email, password });
		}
	};
	//Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/Bookmark" />;
	}
	return (
		<Fragment>
			<section className="container">
				<Alert />
				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">
					<i className="fas fa-user" /> Create Your Account
				</p>
				<form className="form" onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							onChange={(e) => onChange(e)}
							required
						/>
						<small className="form-text">
							This site uses Gravatar so if you want a profile image, use a Gravatar email
						</small>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Password"
							name="password"
							minLength="6"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Confirm Password"
							name="password2"
							minLength="6"
							onChange={onChange}
						/>
					</div>
					<input type="submit" className="btn btn-primary" value="Register" />
				</form>
				<p className="my-1">
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</section>
		</Fragment>
	);
};
Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
