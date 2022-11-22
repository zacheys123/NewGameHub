import React, { useState, useEffect } from 'react';
import {
	Stack,
	Box,
	Card,
	FormControl,
	Typography,
	InputLabel,
	TextField,
	Button,
	IconButton,
	MenuItem,
} from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useGameContext } from '../../../../context/context_/GameContext';
const Categories = () => {
	const {
		modes_state: {
			mode_choice,
			allteams,
			modes: {
				quickref,
				tournament,
				practice,
				best_of,
				career,
				online,
				home_away,
			},
		},
		setMode,
	} = useGameContext();
	const [category, setCateg] = useState('');
	const [active, setActive] = useState(false);

	return (
		<div className="category">
			{allteams && (
				<IconButton
					onClick={() =>
						setMode({
							type: 'BACK',
						})
					}
				>
					{' '}
					<ArrowCircleLeftIcon className="back__icon" />
				</IconButton>
			)}

			<Button
				onClick={() =>
					setMode({
						type: 'QUICK',
						payload: { mode_choice },
					})((quickref.current.style.display = 'block'))
				}
				variant="outlined"
				className="category__control"
			>
				Quick Match
			</Button>
			<Button
				onClick={() =>
					setMode({
						type: 'TOURNAMENTS',
						payload: { tournament, mode_choice },
					})
				}
				variant="outlined"
				className="category__control"
			>
				Tournament
			</Button>
			<Button
				onClick={() => ''}
				variant="outlined"
				className="category__control"
			>
				Best of Series
			</Button>
			<Button
				onClick={() => ''}
				variant="outlined"
				className="category__control"
			>
				Career Mode
			</Button>
			<Button
				onClick={() => ''}
				variant="outlined"
				className="category__control"
			>
				Online Friendly
			</Button>
			<Button
				onClick={() => ''}
				variant="outlined"
				className="category__control"
			>
				Practice Arena
			</Button>
			<Button
				onClick={() => ''}
				variant="outlined"
				className="category__control"
			>
				Home And Away
			</Button>
		</div>
	);
};

export default Categories;
