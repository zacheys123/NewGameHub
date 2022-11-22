import API from '../api';
let baseUrl = 'http://localhost:5000';
export const Game_Reg = async (player_data, setMode, loading) => {
	try {
		await API.post(` ${baseUrl}/game/quickmatch`, player_data);
		setTimeout(() => {
			setMode({ type: 'POST', loading });
		}, 2000);
		setMode({ type: 'POST_ERROR', loading });
	} catch (error) {
		setMode({ type: 'POST_ERROR', loading });
		console.log(error.message);
	} finally {
		setMode({ type: 'POST_ERROR', loading });
	}
};

// export const getplayer = async (source, setGame) => {
// 	try {
// 		let response = await API.get('/game', {
// 			cancelToken: source.token,
// 		});
// 		setGame({ type: 'LOAD_GAMES', payload: response.data.result });
// 	} catch (error) {
// 		setGame({ type: 'ERROR_GAMES' });
// 	} finally {
// 		setGame({ type: 'ERROR_GAMES' });
// 	}
// };
