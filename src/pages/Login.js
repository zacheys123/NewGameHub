import React, { useEffect, useState } from 'react';
import {
	MDBCard,
	MDBCardBody,
	MDBInput,
	MDBCardFooter,
	MDBValidation,
	MDBBtn,
	MDBIcon,
	MDBSpinner,
} from 'mdb-react-ui-kit';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignin, login } from '../redux/features/authSlice';
import { getUser } from '../context/actions/getCurrentUser';
const initsate = { email: '', password: '' };
const Login = () => {
	const [formval, setFormval] = useState(initsate);
	const { loading, error } = useSelector((state) => ({
		...state.auth,
	}));
	const [err, setError] = useState('');
	const { email, password } = formval;
	const navigate = useNavigate();
	const [checked, setChecked] = useState(false);
	const [gdata, setGdata] = useState({
		name: '',
		email: '',
		jti: '',
	});
	const dispatch = useDispatch();
	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (email && password) {
			dispatch(login({ formval, navigate, toast }));
		} else {
			setError('please enter your email and password');
		}
	};
	const oncInputChange = (ev) => {
		let { name, value } = ev.target;
		setFormval({ ...formval, [name]: value });
	};

	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	// Google signin

	// useEffect(() => {
	// 	/*global google*/
	// 	google.accounts.id.initialize({
	// 		client_id:
	// 			'328659417417-1uk3iiqcl4o53rc1rasd1lavrnoppala.apps.googleusercontent.com',
	// 		callback: (response) => {
	// 			var base64Url = response.credential.split('.')[1];
	// 			var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	// 			var jsonpayload = decodeURIComponent(atob(base64));
	// 			setGdata(JSON.parse(jsonpayload));
	// 			const email = gdata?.email;
	// 			const name = gdata?.email;
	// 			const jti = gdata?.jti;
	// 			const result = { email, name, jti };
	// 			dispatch(googleSignin(result, navigate, toast));
	// 		},
	// 	});
	// 	google.accounts.id.renderButton(
	// 		document.getElementById('signinbutton'),

	// 		{ theme: 'outline', size: 'large' },
	// 	);
	// }, []);
	//https://www.youtube.com/watch?v=n_9DI-AqYN8&list=PLufbXXGswL_pS6rdWbDO56oiZovLWE_rs&index=2
	return (
		<div
			style={{
				margin: 'auto',
				padding: '15px',
				maxWidth: '450px',
				alignContent: 'center',
				marginTop: '120px',
				minHeight: '70vh',
			}}
		>
			<MDBCard alignment="center">
				<MDBIcon fas icon="user-circle" className="fa-2x" />
				<h1>Sign in</h1>
				<MDBCardBody>
					<MDBValidation
						onSubmit={handleSubmit}
						noValidate
						className="row g-3"
					>
						<div className="col-md-12 mb-4">
							{' '}
							<MDBInput
								label="Email"
								type="email"
								value={email}
								name="email"
								onChange={oncInputChange}
								required
							/>
						</div>
						<div className="col-md-12 mt-4">
							{' '}
							<MDBInput
								label="Password"
								type={!checked ? 'password' : 'text'}
								value={password}
								name="password"
								onChange={oncInputChange}
								required
							/>
						</div>
						<div className="col-md-12 mt-4">
							{' '}
							<input
								style={{
									textAlign: 'left',
									width: '2rem',
									height: '1.2rem',
								}}
								type="checkbox"
								name="password"
								onChange={(ev) => setChecked(!checked)}
							/>
							:{!checked ? 'Show Password' : 'Hide Password'}
						</div>
						{err ? (
							<p style={{ color: 'red', marginTop: '10px' }}>{err}</p>
						) : (
							''
						)}
						<div className="col-12">
							<MDBBtn
								style={{ width: '100%' }}
								className={err ? '' : 'mt-4'}
							>
								{loading && (
									<MDBSpinner
										size="sm"
										tag="span"
										className="me-2"
										role="status"
									/>
								)}
								Login
							</MDBBtn>
						</div>
					</MDBValidation>
					<br />
					<div id="signinbutton" className=""></div>
				</MDBCardBody>
				<MDBCardFooter>
					<Link to="/register">
						<p>Don't have an account? Sign up</p>
					</Link>
				</MDBCardFooter>
			</MDBCard>
		</div>
	);
};

export default Login;
