import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Stack,
	Box,
	Card,
	FormControl,
	Select,
	InputLabel,
	TextField,
	Button,
	MenuItem,
} from '@mui/material';
import './css/Fifa.css';
import fifa23 from '../../../../assets/fifa2023.avif';
import fifa22 from '../../../../assets/catwoman.jpg';
import fifa21 from '../../../../assets/dark.jpg';
import fifa20 from '../../../../assets/gta5.jpg';
import Categories from '../fifa_categories/Categories';
import Modes from '../../Fifa_Modes';
const Fifa = () => {
	const [team, setTeam] = useState('');
	const [modes, setModes] = useState(null);
	const parentref = (mode_refs) => {
		setModes(mode_refs);
	};

	return (
		<>
			<Stack
				height="100%"
				style={{
					background: 'wheat',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box sx={{ flex: 1 }}>
					{' '}
					<Categories modes={modes} />
				</Box>
				<Box
					sx={{
						flex: 9,
						background: 'white',
						position: 'relative',
						minHeight: '70vh',
					}}
				>
					<Modes parentref={parentref} />
				</Box>
			</Stack>
		</>
	);
};

export default Fifa;
