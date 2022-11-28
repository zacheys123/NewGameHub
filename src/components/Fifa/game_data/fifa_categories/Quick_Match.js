import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Stack, Box, TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getLeagues } from '../../../../context/actions/getLeagues';
import { createGame } from '../../../../context/api';
import shortid from 'shortid';
import { useGameContext } from '../../../../context/context_/GameContext';
import { Game_Reg } from '../../../../context/actions/gameSlice';
import { alignProperty } from '@mui/material/styles/cssUtils';
const Quick_Match = () => {
	const {
		modes_state: {
			player1_data,
			game_info,
			allteams,
			loading,
			rec_match,
		},
		setMode,
	} = useGameContext();

	const [loader, setLoading] = useState(false);
	const [temp_data, setTemp] = useState(
		JSON.parse(window.localStorage.getItem('rec_games')),
	);
	const [sample_game_data, setSample] = useState({
		player1_team: 'CT1',
		player2_team: 'T2',
		player1: 'P1',
		player2: 'P2',
		telno1: 'tel1',
		telno2: 'tel2',
		station: 'st no',
	});

	const [player_data, setPlayerData] = useState({});
	const [extra_data, setExtraData] = useState({});
	const data_game = JSON.parse(
		window.localStorage.getItem('rec_games'),
	);
	const game_data = {
		...player_data,
		_id: shortid.generate(),
	};
	const startmatch = async (ev) => {
		ev.preventDefault();

		if (
			(player_data.player1_team &&
				player_data.player2_team &&
				player_data?.player1 &&
				player_data?.player2) ||
			player_data?.telno1 ||
			player_data?.telno2
		) {
			setTimeout(() => {
				setMode({
					type: 'GAME_INFO',
					payload: {
						game_data: JSON.parse(
							window.localStorage.getItem('games'),
						),
						player_data,
						records: [...rec_match, game_data],
					},
				});

				rec_match.push(game_data);
				// 	setTimeout(() => {
				window.localStorage.setItem(
					'games',
					JSON.stringify(game_data),
				);
				window.localStorage.setItem(
					'rec_games',
					JSON.stringify(game_data),
				);
				console.log(temp_data);
				setTemp(rec_match);
				setLoading(false);
			}, 1000);
			// window.localStorage.removeItem('games');

			setLoading(true);
		} else {
			alert('Do not submit Empty Inputs');
		}
	};

	const setGame = useCallback(
		(ev) => {
			ev.preventDefault();

			let newdata = {
				...game_data,
				...extra_data,
			};

			Game_Reg(newdata, setMode, loading);
		},
		[extra_data, game_data],
	);
	const handleChange = (ev) => {
		setPlayerData({
			...player_data,
			[ev.target.name]: ev.target.value,
		});
	};
	const handleExtra = (ev) => {
		setExtraData({
			...extra_data,
			[ev.target.name]: ev.target.value,
		});
	};

	// Remove Request
	const remove = (id) => {
		window.localStorage.getItem('rec_games');
		rec_match.splice(id, 1);
		window.localStorage.setItem(
			'rec_games',
			JSON.stringify(rec_match),
		);
	};
	//

	useEffect(() => {
		setTemp(JSON.parse(localStorage.getItem('rec_games')));
	}, []);
	return (
		<Stack direction="row">
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
				className="modeRight__quickmatch"
			>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<Stack
						direction="row"
						sx={{ width: '100%' }}
						justifyContent="center"
					>
						<Box className="player1">
							<h3 align="center" style={{ color: 'red' }}>
								Player1
							</h3>

							<Box className="player__control1">
								<TextField
									InputLabelProps={{ shrink: true }}
									name="player1_team"
									labelid="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									variant="filled"
									label="Team"
									sx={{
										width: '100%',
									}}
									value={player_data?.player1_team}
									onChange={handleChange}
								/>
							</Box>
							<Box className="player__name">
								<TextField
									InputLabelProps={{ shrink: true }}
									sx={{ width: '100%' }}
									name="player1"
									id="demo-player1"
									variant="filled"
									value={player_data?.player1}
									labelid="demo-player1-id"
									label="Enter Player Name"
									required
									onChange={handleChange}
								/>
							</Box>
							<Box className="player__name">
								<TextField
									InputLabelProps={{ shrink: true }}
									sx={{ width: '100%' }}
									name="telno1"
									id="demo-player1"
									variant="filled"
									value={player_data?.telno1}
									labelid="demo-player1-id"
									label="Enter Tel No(optional)"
									onChange={handleChange}
								/>
							</Box>
						</Box>

						<Box className="player2">
							{' '}
							<h3 align="center" style={{ color: 'blue' }}>
								Player2
							</h3>
							<Box className="player__control1">
								<TextField
									InputLabelProps={{ shrink: true }}
									name="player2_team"
									labelid="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									label="Team"
									variant="filled"
									sx={{ width: '100%' }}
									value={player_data?.player2_team}
									onChange={handleChange}
								/>
							</Box>
							<Box className="player__name">
								<TextField
									InputLabelProps={{ shrink: true }}
									sx={{ width: '100%' }}
									name="player2"
									id="demo-player2"
									variant="filled"
									value={player_data?.player2}
									labelid="demo-player2-id"
									label="Enter Player Name"
									required
									onChange={handleChange}
								/>
							</Box>
							<Box className="player__name">
								<TextField
									InputLabelProps={{ shrink: true }}
									sx={{ width: '100%' }}
									name="telno2"
									id="demo-player2"
									variant="filled"
									value={player_data?.telno2}
									labelid="demo-player2-id"
									label="Enter Tel No(optional)"
									onChange={handleChange}
								/>
							</Box>
						</Box>
					</Stack>
					<Box className="station">
						<TextField
							InputLabelProps={{ shrink: true }}
							sx={{ width: '20%', marginTop: '1rem' }}
							name="station"
							id="demo-station"
							variant="filled"
							value={player_data?.station}
							labelid="demo-station-id"
							label="Enter station category(e.g No 4){optional}"
							onChange={handleChange}
						/>
					</Box>
					<Stack
						style={{
							margin: '2rem 0 2rem 0',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{!game_info && (
							<Button
								value
								onClick={startmatch}
								variant="contained"
								sx={{
									width: '40% !important',
									padding: '.9rem',
									marginTop: '3rem',
								}}
							>
								{loader && (
									<CircularProgress
										color="secondary"
										sx={{ fontSize: '.6rem', marginRight: '.6rem' }}
									/>
								)}{' '}
								Start Match
							</Button>
						)}
					</Stack>
				</div>
			</Box>
			<Box className="preview">
				<h4 style={{ textDecoration: 'underline' }} align="center">
					Game Preview
				</h4>
				<ul>
					{temp_data &&
						temp_data.map(
							(
								{
									_id,
									player1,
									player2,
									player1_team,
									player2_team,
									station,
								},
								index,
							) => {
								return (
									<li key={index}>
										<Stack
											direction="row"
											justifyContent="space-between"
										>
											<Box className="p1">
												<h6>{player1}</h6>
												<input
													type="text"
													disabled
													className="player1"
													name="player1_team"
													value={player1_team}
													placeholder="Team one"
												/>
												<input
													type="text"
													className="goals"
													name="player1_goals"
													value={extra_data?.p1_goal}
													onChange={handleExtra}
													placeholder="Team1 score"
												/>
											</Box>

											<Box className="p2">
												{' '}
												<h6>{player2}</h6>
												<input
													disabled
													type="text"
													className="player2"
													name="player2_team"
													value={player2_team}
													placeholder="Team two"
												/>
												<input
													type="text"
													id="score"
													className="goals"
													name="player2_goals"
													value={extra_data?.p2_goal}
													onChange={handleExtra}
													placeholder="Team2 score"
												/>
											</Box>
										</Stack>
										<Box
											className="d-flex flex-row
									"
										>
											<Box className="amount d-flex flex-column">
												<label htmlFor="amount">
													Amount:
													<input
														type="number"
														name="amount"
														id="amount"
														onChange={handleExtra}
														value={extra_data?.amount}
													/>
												</label>
												<label htmlFor="paid">
													AmPaid:
													<input
														id="paid"
														type="number"
														name="paid"
														onChange={handleExtra}
														value={extra_data?.paid}
													/>
												</label>
											</Box>{' '}
											<div className="outcome">
												<input
													type="text"
													name="outcome"
													onChange={handleExtra}
													value={extra_data?.outcome}
													className="outcome"
													placeholder="Match Winner"
												/>
											</div>
										</Box>
										<Box
											sx={{
												margin: '.7rem auto .7rem auto',
											}}
										>
											{' '}
											<label htmlFor="station">
												Station No:
												<input
													style={{ color: 'white' }}
													type="text"
													value={station}
													disabled
												/>
											</label>{' '}
										</Box>
										<Button
											onClick={setGame}
											variant="outlined"
											type="submit"
											className="butt"
										>
											{loading && (
												<CircularProgress
													color="secondary"
													sx={{
														fontSize: '.6rem',
														marginRight: '.6rem',
													}}
												/>
											)}{' '}
											End/Save Match
										</Button>
										<Button
											onClick={remove(index)}
											variant="outlined"
											type="submit"
											className="butt"
										>
											Remove
										</Button>
									</li>
								);
							},
						)}
				</ul>
			</Box>
		</Stack>
	);
};

export default Quick_Match;
