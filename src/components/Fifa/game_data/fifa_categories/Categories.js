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
import {
	handlequick,
	handletourn,
	handleprac,
	handlebestof,
	handlecareer,
} from './modesreducer';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useGameContext } from '../../../../context/context_/GameContext';
import '../../../../css/Category.css';
const Categories = ({ modes }) => {
	const {
		modes_state: { mode_choice, allteams },
		setMode,
	} = useGameContext();
	const [category, setCateg] = useState('');
	const [active, setActive] = useState(false);

	useEffect(() => {
		modes?.quickref?.current?.classList?.add('remove-active');
		modes?.tournref?.current?.classList?.add('remove-active');
		modes?.pracref?.current?.classList?.add('remove-active');
		modes?.bestof?.current?.classList?.add('remove-active');
		modes?.careerref?.current?.classList?.add('remove-active');
		modes?.quickref?.current?.classList?.add('remove-active');
	});
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
				onClick={() => {
					handlequick(modes);
				}}
				variant="outlined"
				className="category__control"
			>
				Quick Match
			</Button>
			<Button
				onClick={() => handletourn(modes)}
				variant="outlined"
				className="category__control"
			>
				Tournament
			</Button>
			<Button
				onClick={() => handlebestof(modes)}
				variant="outlined"
				className="category__control"
			>
				Best of Series
			</Button>
			<Button
				onClick={() => handlecareer(modes)}
				variant="outlined"
				className="category__control"
			>
				Career Mode
			</Button>

			<Button
				onClick={() => handleprac(modes)}
				variant="outlined"
				className="category__control"
			>
				Practice Arena
			</Button>
		</div>
	);
};

export default Categories;
