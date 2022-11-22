import React, {
	useContext,
	createContext,
	useReducer,
	useRef,
} from 'react';

import { gamereducer } from '../reducers/gamereducers';
import { mode_reducers } from '../reducers/mode_reducers';

const initialState = {
	fifa: false,
	goa: false,
	gta: false,
	head: false,
	games: [],
	search: false,
	loading: true,
	search_input: '',
	search_category: '',
	from_date: Date.now,
	to_date: Date.now,
	date_search: false,
	error: '',
	team_standings: [],
	team_features: [],
	standings_check: false,
};

const initial_mode = {
	player1_auth: false,
	player2_auth: false,
	player1_data: [],
	player2_data: [],
	mode_choice: true,
	allteams: false,
	loading: false,
	player1_team: '',
	player2_team: '',
	game_info: false,
	rec_match: [],
	recorded_match: [],
	p_data: {},
	modes: {
		quick: false,
		tournament: false,
		practice: false,
		best_of: false,
		career: false,
		online: false,
		home_away: false,
	},
};
const GameProvider = createContext(initialState);
const GameContext = ({ children }) => {
	const [game, setGame] = useReducer(gamereducer, initialState);

	const [modes_state, setMode] = useReducer(
		mode_reducers,
		initial_mode,
	);
	let value = { game, setGame, setMode, modes_state };
	return (
		<GameProvider.Provider value={value}>
			{children}
		</GameProvider.Provider>
	);
};

export default GameContext;

export const useGameContext = () => {
	const context = useContext(GameProvider);
	if (!context) {
		throw new Error('useGameContext can only be used in children');
	}
	return context;
};
