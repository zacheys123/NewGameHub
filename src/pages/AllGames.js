import {
	Box,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Stack,
	Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGameContext } from '../context/context_/GameContext';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {
	textFilter,
} from 'react-bootstrap-table2-filter';
import '../css/Summary.css';
import { useNavigate } from 'react-router-dom';
const AllGames = () => {
	const [loading, setLoading] = useState(true);
	const {
		game: { games },
		setGame,
	} = useGameContext();

	const getgames = async (source) => {
		try {
			setLoading(true);
			let response = await axios.get('http://localhost:5000/game', {
				cancelToken: source.token,
			});
			setGame({ type: 'LOAD_GAMES', payload: response.data.result });
			setLoading(false);
		} catch (error) {
			setLoading(true);
			setGame({ type: 'ERROR_GAMES' });
		} finally {
			setGame({ type: 'ERROR_GAMES' });
		}
	};

	useEffect(() => {
		const source = axios.CancelToken.source();
		getgames(source);

		return () => {
			source.cancel();
		};
	}, []);

	const columns = [
		{
			dataField: 'player1',
			text: 'Player1',
			sort: true,
			filter: textFilter(),
		},
		{ dataField: 'player2', text: 'Player2', filter: textFilter() },
		{
			dataField: 'player1_team',
			text: 'Player1_team',
			filter: textFilter(),
		},
		{
			dataField: 'player2_team',
			text: 'Player2_team',
			filter: textFilter(),
		},
		{ dataField: 'player1_goals', text: 'Player1_goal(s)' },
		{ dataField: 'player2_goals', text: 'Player2_goal(s)' },
		{ dataField: 'outcome', text: 'Outcome', filter: textFilter() },
		{ dataField: 'amount', text: 'Amount' },
		{ dataField: 'paid', text: 'Amount Paid' },
		{
			dataField: 'created_at',
			text: 'Created_at',
			filter: textFilter(),
		},
	];
	const pagination = paginationFactory({
		page: 1,

		lastPageText: '>>',
		firstPageText: '<<',
		nextPageText: '>',
		prePageText: '<',
		showTotal: true,
		alwaysShowAllBtns: true,
		onPageChange: function (page, sizePerPageList) {
			console.log('page', page);
			console.log('sizePerpage', sizePerPageList);
		},
		onSizePerPageChange: function (page, sizePerPage) {
			return [page, sizePerPage];
		},
		sizePerPageList: [
			{
				text: '5',
				value: 5,
			},
			{
				text: '10',
				value: 10,
			},
			{
				text: '30',
				value: 30,
			},
		],
	});
	const navigate = useNavigate();

	return (
		<Box className="all__games">
			<Box>
				{' '}
				<header className="header">
					<h4 align="center"> Data Hub</h4>
				</header>
			</Box>
			<Box className="players">
				{loading ? (
					<Stack style={{ display: 'flex', flexWrap: 'wrap' }}>
						<Stack spacing={1}>
							{/* For variant="text", adjust the height via font-size */}
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />

							{/* For other variants, adjust the size with `width` and `height` */}
							<Skeleton variant="circular" width={40} height={40} />
							<Skeleton
								variant="rectangular"
								width={210}
								height={60}
							/>
							<Skeleton variant="rounded" width={210} height={60} />
						</Stack>
						<Stack spacing={1}>
							{/* For variant="text", adjust the height via font-size */}
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />

							{/* For other variants, adjust the size with `width` and `height` */}
							<Skeleton variant="circular" width={40} height={40} />
							<Skeleton
								variant="rectangular"
								width={210}
								height={60}
							/>
							<Skeleton variant="rounded" width={210} height={60} />
						</Stack>
						<Stack spacing={1}>
							{/* For variant="text", adjust the height via font-size */}
							<Skeleton variant="text" sx={{ fontSize: '1rem' }} />

							{/* For other variants, adjust the size with `width` and `height` */}
							<Skeleton variant="circular" width={40} height={40} />
							<Skeleton
								variant="rectangular"
								width={210}
								height={60}
							/>
							<Skeleton variant="rounded" width={210} height={60} />
						</Stack>
					</Stack>
				) : (
					<div style={{ width: '98%', margin: '0.5rem auto' }}>
						<BootstrapTable
							className="table table-stripped bg-dark"
							keyField="_id"
							data={games}
							columns={columns}
							pagination={pagination}
							filter={filterFactory()}
							rowClasses="custom-row-class"
						/>
					</div>
				)}
			</Box>
		</Box>
	);
};

export default AllGames;
