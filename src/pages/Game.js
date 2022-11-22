import React, { useState } from 'react';
import '../css/Games.css';
import {
	Stack,
	Box,
	Container,
	TextField,
	Button,
	Select,
	FormControl,
	MenuItem,
	InputLabel,
} from '@mui/material';
import Game__Data from '../components/Fifa/game_data/Game__Data';
import { useGameContext } from '../context/context_/GameContext';
import Standings from './Standings';
const Game = () => {
	const [games, setGamesInput] = useState('');
	const [standings, setStandings] = useState('');
	const [year, getYear] = useState('');
	const {
		game: { fifa, goa, gta, head, standings_check },
		modes_state: { mode_choice },
		setGame,
		setMode,
	} = useGameContext();
	const handleChange = (event) => {
		setGamesInput(event.target.value);
		setStandings(event.target.value);
	};
	return (
		<Box className="main__games">
			<Box className="maingame__header">
				<FormControl
					className={!fifa ? 'header__control' : 'header__disabled'}
				>
					<InputLabel
						sx={{
							mx: 2,
							color: 'red !important',
							fontWeight: 'bold',
							opacity: 0.8,
						}}
						id="demo-simple-select-standard-label"
					>
						{!head ? 'Popular Games Category...' : ''}
					</InputLabel>
					<Select
						sx={{ color: 'black !important' }}
						labelId="demo-simple-select-standard-label"
						id="demo-simple-select-standard"
						label="Games"
						value={games}
						onChange={handleChange}
					>
						<MenuItem
							value="fifa"
							onClick={() => setGame({ type: 'FIFA', payload: fifa })}
						>
							FIFA football{' '}
						</MenuItem>
						<MenuItem
							value="gow"
							onClick={() =>
								setGame({ type: 'GOD_OF_WAR', payload: goa })
							}
							disabled
						>
							God of war(Coming soon)
						</MenuItem>
						<MenuItem value="re" onClick="" disabled>
							Resident Evil 2(Coming soon)
						</MenuItem>
						<MenuItem value="Fortnite" disabled>
							Fortnite(Coming soon)
						</MenuItem>
						<MenuItem
							value="gta"
							onClick={() => setGame({ type: 'GTA', payload: gta })}
							disabled
						>
							Grand Theft Auto V(Coming soon)
						</MenuItem>
						<MenuItem value="Uncharted" onClick="" disabled>
							Uncharted: The Nathan Drake Collection(Coming soon)
						</MenuItem>
						<MenuItem value="witcher" disabled>
							The Witcher 3: Wild Hunt(Coming soon)
						</MenuItem>
						<MenuItem value="Uncharted4" onClick="" disabled>
							Uncharted 4: A Thief's End(Coming soon)
						</MenuItem>
						<MenuItem value="horizon" disabled>
							{' '}
							Horizon Zero Dawn(Coming soon)
						</MenuItem>
						<MenuItem value="red" onClick="" disabled>
							Red Dead Redemption II(Coming soon)
						</MenuItem>
						<MenuItem value="spider" disabled>
							Spider-Man(Coming soon)
						</MenuItem>
						<MenuItem value="last" onClick="" disabled>
							The Last Of Us Remastered(Coming soon)
						</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Box className="maingames__container">
				<Game__Data />
			</Box>
		</Box>
	);
};

export default Game;
