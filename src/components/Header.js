import React, { useState, useEffect } from 'react';
import { Stack, Box, Button, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo2.jpg';

import '../css/Global.css';
import '../css/Header.css';
import { useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { useMainContext } from '../context/context_/MainContext';
import { setLogout } from '../redux/features/authSlice';
import Theme from './Theme';
import { useSelector } from 'react-redux';
const Header = () => {
	const {
		main: { istheme, contact, currentuser },
		setMainContext,
	} = useMainContext();
	const [profile, setProfile] = useState(false);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state.auth }));
	const navigate = useNavigate();
	let source = user?.result?.username.split('')[0].toUpperCase();

	const handleLogout = () => {
		dispatch(setLogout());
		console.log(user);
		navigate('./login');
	};

	const [active, setActive] = useState(false);
	const [prof, setProf] = useState(false);

	const dashboard = () => {
		setActive(false);
		setProf((prev) => !prev);
	};
	const prof_ = () => {
		setActive(true);
		setProf(false);
	};
	const contacts = (ev) => {
		ev.preventDefault();
		setMainContext({ type: 'CONTACT', payload: contact });
	};
	const location = useLocation();
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			className={istheme ? 'header' : 'bg-dark text-light'}
		>
			<Stack direction="row" alignItems="center" flex={1}>
				<Stack
					flex={1}
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						marginLeft: '2.3rem',
					}}
				>
					<MenuIcon sx={{ margin: 'auto 2rem' }} className="menu" />
					<Link to="/">
						<img
							src={logo}
							alt=""
							style={{
								height: '55px',
								width: '50px',
								borderRadius: '50%',
							}}
						/>
					</Link>

					<h2
						style={{
							fontFamily: ' Times, serif',
							fontSize: '30px',
							fontWeight: '1200 !important',
						}}
						className="navbrand"
					>
						Game<span style={{ color: 'red' }}>Hub ⚽ </span>{' '}
					</h2>
				</Stack>

				<Box className="nav">
					<Link
						className={user?.result?._id ? 'item' : 'disabled'}
						to="/game"
					>
						{' '}
						<Button
							style={{
								color: !istheme ? 'lightblue' : 'darkblue',
								border: !istheme
									? '1px solid white'
									: '1px solid darkblue',
							}}
							variant="outlined"
							size="small"
						>
							Game
						</Button>
					</Link>
					<Link
						className={user?.result?._id ? 'item' : 'disabled'}
						to="/summary"
					>
						{' '}
						<Button
							style={{
								color: !istheme ? 'lightblue' : 'darkblue',
								border: !istheme
									? '1px solid white'
									: '1px solid darkblue',
							}}
							variant="outlined"
							size="small"
						>
							Summary
						</Button>
					</Link>
					<Link
						className={user?.result?._id ? 'item' : 'disabled'}
						to="/standings"
					>
						{' '}
						<Button
							style={{
								color: !istheme ? 'lightblue' : 'darkblue',
								border: !istheme
									? '1px solid white'
									: '1px solid darkblue',
							}}
							variant="outlined"
							size="small"
						>
							League Standings
						</Button>
					</Link>
					{location.pathname === '/' && (
						<li className={user?.result?._id ? 'item' : 'disabled'}>
							{' '}
							<Button
								style={{
									color: !istheme ? 'lightblue' : 'darkblue',
									border: !istheme
										? '1px solid white'
										: '1px solid darkblue',
								}}
								className="butt"
								onClick={contacts}
								variant="outlined"
							>
								Contact
							</Button>
						</li>
					)}
					<Box className="theming">
						<Theme />
					</Box>
				</Box>
			</Stack>
			<div
				className={user?.result?._id ? 'd-block' : 'd-none'}
				style={{ position: 'relative' }}
			>
				<Stack
					onClick={() => setProfile(!profile)}
					className="avatar"
				>
					{source}
				</Stack>
				{profile && (
					<Box
						sx={{
							position: 'absolute',
							background: 'black',
							padding: '1rem',
							borderRadius: '10px',
							right: '1rem',
							width: '15rem',
							zIndex: '999',
						}}
					>
						<Typography
							onClick={dashboard}
							variant="body2"
							className={!active ? 'acti' : 'inacti'}
						>
							DashBoard
						</Typography>
						<Typography
							onClick={prof_}
							className={active ? 'acti' : 'inacti'}
							variant="body2"
							sx={{
								color: 'white',
								padding: '1rem',
								textAlign: 'center',
							}}
						>
							View Profile
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: 'white',
								padding: '1rem',
								textAlign: 'center',
							}}
						>
							Refresh
						</Typography>{' '}
						<Button
							style={{ marginLeft: '1rem !important' }}
							onClick={handleLogout}
							variant="outlined"
							size="small"
						>
							Log Out
						</Button>
					</Box>
				)}
			</div>
		</Stack>
	);
};

export default Header;
