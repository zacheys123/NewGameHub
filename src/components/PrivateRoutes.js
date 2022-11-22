import React from 'react';

import { useMainContext } from '../context/context_/MainContext';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoutes = ({ children }) => {
	const location = useLocation();
	const { user } = useSelector((state) => ({ ...state.auth }));
	console.log(user?.result?._id);
	if (!user?.result?._id) {
		return <Navigate to="/login" state={{ from: location }} />;
	}
	return children;
};
export default PrivateRoutes;
