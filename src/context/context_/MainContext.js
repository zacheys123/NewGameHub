import React, { useContext, createContext, useReducer } from 'react';

import { mainreducer } from '../reducers/mainreducer';

const initialState = {
	auth: false,
	istheme: false,
	currentuser: { email: '' },
	modalerror: null,
	loading: false,
	modalsuccess: null,
	ismodal: false,
	contact: false,
	descr: false,
	data_feed: {},
};
const MainProvider = createContext(initialState);
const MainContext = ({ children }) => {
	const [main, setMainContext] = useReducer(
		mainreducer,
		initialState,
	);
	let value = { main, setMainContext };
	return (
		<MainProvider.Provider value={value}>
			{children}
		</MainProvider.Provider>
	);
};

export default MainContext;

export const useMainContext = () => {
	const context = useContext(MainProvider);
	if (!context) {
		throw new Error('UseMainContext can only be used in children');
	}
	return context;
};
