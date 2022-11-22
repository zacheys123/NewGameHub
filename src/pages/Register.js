import React, { useEffect, useState, useRef } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { register } from '../redux/features/authSlice';
const initsate = {
	email: '',
	password: '',
	firstname: '',
	lastname: '',
	confirmpasword: '',
};
const Register = () => {
	const [formval, setFormval] = useState(initsate);
	const [checked, setChecked] = useState(false);
	const { loading, error } = useSelector((state) => ({
		...state.auth,
	}));
	const [err, setError] = useState('');
	const { email, password, firstname, lastname, confirmpassword } =
		formval;
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (password !== confirmpassword) {
			return toast.error('Password should match');
		}
		if (
			email &&
			password &&
			firstname &&
			lastname &&
			confirmpassword
		) {
			dispatch(register({ formval, navigate, toast }));
		} else {
			setError('All field should be entered');
		}
	};
	const oncInputChange = (ev) => {
		let { name, value } = ev.target;
		setFormval({ ...formval, [name]: value });
	};

	useEffect(() => {
		error && toast.error(error);
	}, [error]);
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
				<h1>Sign Up</h1>
				<MDBCardBody>
					<MDBValidation
						onSubmit={handleSubmit}
						noValidate
						className="row g-3"
					>
						<div className="col-md-12">
							{' '}
							<MDBInput
								label="Firstname"
								type="text"
								value={firstname}
								name="firstname"
								onChange={oncInputChange}
								required
							/>
						</div>
						<div className="col-md-12 ">
							{' '}
							<MDBInput
								label="Lastname"
								type="text"
								value={lastname}
								name="lastname"
								onChange={oncInputChange}
								required
							/>
						</div>
						<div className="col-md-12 ">
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
						<div className="col-md-12">
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
						<div className="col-md-12 ">
							{' '}
							<MDBInput
								label="Confirm Password"
								type={!checked ? 'password' : 'text'}
								value={confirmpassword}
								name="confirmpassword"
								onChange={oncInputChange}
								required
							>
								{' '}
							</MDBInput>
						</div>
						<div className="col-md-12 mt-4">
							{' '}
							<input
								style={{ textAlign: 'left' }}
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
								Register
							</MDBBtn>
						</div>
					</MDBValidation>
				</MDBCardBody>
				<MDBCardFooter>
					<Link to="/login">
						<p>Already have an account? Sign in</p>
					</Link>
				</MDBCardFooter>
			</MDBCard>
		</div>
	);
};

export default Register;
