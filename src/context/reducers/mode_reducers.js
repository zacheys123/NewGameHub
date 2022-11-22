export const mode_reducers = (state = {}, action) => {
	switch (action.type) {
		case 'GET_PLAYER1_TEAMS':
			return {
				...state,
				player1_data: action.payload.response,
				loading: !action.payload.loading,
			};
		case 'GET_PLAYER2_TEAMS':
			return {
				...state,
				player2_data: action.payload.response,
				loading: !action.payload.loading,
			};
		case 'FINALLY':
			return {
				...state,

				loading: false,
			};
		case 'QUICK':
			return {
				...state,
				quick: !action.payload.quick,
				tournament: state.tournament,
				practice: state.practice,
				best_of: false,
				career: false,
				online: false,
				home_away: false,
				mode_choice: !action.payload.mode_choice,
			};
		case 'TOURNAMENTS':
			return {
				...state,
				tournament: action.payload.tournament,
				quick: false,
				practice: false,
				best_of: false,
				career: false,
				online: false,
				home_away: false,
				mode_choice: !action.payload.mode_choice,
			};

		case 'NONE':
			return {
				...state,
				mode_choice: false,
			};
		case 'NONE_':
			return {
				...state,
				mode_choice: true,
				allteams: false,
			};
		case 'BACK':
			return {
				...state,
				allteams: false,
			};
		case 'TEAMS':
			return {
				...state,
				allteams: !action.payload,
			};
		case 'PLAYER1':
			return {
				...state,
				player1_team: action.payload,
			};
		case 'PLAYER2':
			return {
				...state,
				player2_team: action.payload,
			};
		case 'PLAYER1_AUTH':
			return {
				...state,
				player1_auth: true,
				player2_auth: false,
			};
		case 'PLAYER2_AUTH':
			return {
				...state,
				player1_auth: false,
				player2_auth: true,
			};
		case 'GAME_INFO':
			return {
				...state,
				recorded_match: action.payload.game_data,
				p_data: action.payload.player_data,

				rec_match: action.payload.records,
			};
		case 'CANCEL_GINFO':
			return {
				...state,
				game_info: false,
			};
		case 'POST':
			return {
				...state,
				loading: false,
			};
		case 'POST_ERROR':
			return {
				...state,
				loading: true,
			};
		default:
			return {
				...state,
			};
	}
};
