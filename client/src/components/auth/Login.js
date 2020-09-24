import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
const Login = ({ login, setAlert, isAuthenticated }) => {
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
			login({ email, password });
		}
	};
	//Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/Bookmark" />;
	}

	return (
		<Fragment>
			<section className="container">
				<h1 className="large text-primary">Sign in</h1>
				<p className="lead">
					<i className="fas fa-user" /> Sign into Your Account
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
					<input type="submit" className="btn btn-primary" value="Login" />
				</form>
				<p className="my-1">
					Don't have an account? <Link to="/register">Sign Up</Link>
				</p>
			</section>
		</Fragment>
	);
};
Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, login })(Login);
