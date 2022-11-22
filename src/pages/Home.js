import { useEffect } from 'react';
import { useMainContext } from '../context/context_/MainContext';
import { useSelector } from 'react-redux';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import { Feed, Layout, Header, Contact } from '../components';

const Home = () => {
	const {
		main: { currentuser, contact },
		maindispatch,
	} = useMainContext();
	const navigate = useNavigate();
	const { user } = useSelector((state) => ({ ...state.auth }));
	return (
		<>
			{user?.result?._id && user?.result?._id ? (
				<div id="signinbutton">
					<Layout>
						<Feed />
						{contact && <Contact />}
					</Layout>
				</div>
			) : (
				<Login />
			)}
		</>
	);
};

export default Home;
