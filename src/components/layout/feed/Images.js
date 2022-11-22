import React, { useState } from 'react';
import {
	Box,
	CardContent,
	CardMedia,
	Typography,
	ImageListItem,
	IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Images.css';
import { useMainContext } from '../../../context/context_/MainContext';

const Images = ({ data }) => {
	const {
		main: { descr },
		setMainContext,
	} = useMainContext();
	return <></>;
};

export default Images;
