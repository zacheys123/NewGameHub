import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	Login,
	Home,
	Register,
	AllGames,
	Admin,
	Game,
	NoPage,
	Standings,
} from './pages';

import Priv_Admin from './components/PrivateRoutes';
import PrivateRoutes from './components/PrivateRoutes';
import { setUser } from './redux/features/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Footer, Header } from './components';
import './App.css';

import { useMainContext } from './context/context_/MainContext';

function App() {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	useEffect(() => {
		dispatch(setUser(user));
	}, [user, dispatch]);

	const [loader, setLoader] = useState(true);
	const spinner = document.getElementById('spinner');

	const myLoader = () => {
		if (spinner) {
			setTimeout(() => {
				spinner.style.display = 'none';
				setLoader(false);
			}, 200);
		}
	};
	useEffect(() => {
		myLoader();
	}, []);

	return (
		<>
			{!loader && (
				<BrowserRouter>
					<div className="App">
						<Header />
						<hr style={{ width: '95%', margin: 'auto' }} />
						<ToastContainer />
						<Routes>
							<Route
								exact
								path="/summary"
								element={
									<PrivateRoutes>
										<AllGames />
									</PrivateRoutes>
								}
							/>
							<Route
								exact
								path="/standings"
								element={
									<PrivateRoutes>
										<Standings />
									</PrivateRoutes>
								}
							/>
							<Route
								exact
								path="/game"
								element={
									<PrivateRoutes>
										{' '}
										<Game />
									</PrivateRoutes>
								}
							/>
							<Route
								path="*"
								element={
									<PrivateRoutes>
										{' '}
										<NoPage />
									</PrivateRoutes>
								}
							/>

							<Route
								exact
								path="/admin"
								element={
									<Priv_Admin>
										<Admin />
									</Priv_Admin>
								}
							/>

							<Route exact path="/" element={<Home />} />
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/register" element={<Register />} />
						</Routes>
						<Footer />
					</div>
				</BrowserRouter>
			)}
		</>
	);
}

export default App;
