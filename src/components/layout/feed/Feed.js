import React, { useState, useEffect } from 'react';
import {
	Stack,
	Card,
	Box,
	Button,
	Typography,
	Container,
	ImageList,
	ImageListItem,
	CardContent,
	CardMedia,
	IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../../../css/Feed.css';
import { feed } from './feed_images';
import gods from '../../../assets/gods.jpg';
import { useMainContext } from '../../../context/context_/MainContext';
import Images from './Images';
const Feed = () => {
	const {
		main: { descr },
		setMainContext,
	} = useMainContext();
	const [info, setInfo] = useState(false);
	const [images, setImages] = useState(feed);

	return (
		<>
			<Stack direction={{ xs: 'column', sm: 'row' }} className="feed">
				<Box className="right__box">
					<Stack direction="row">
						<Box className="rightbox__info">
							<div className="right__info">
								<div>
									<Typography className="heading">
										What is GameHub?
									</Typography>
									<Typography className="info">
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GameHub is an online
										Management System.For storing well structured game
										data, e.g games played,who played,amount of money
										given and more.GameHub reduces the hustle of
										knowing who and when and a game was played.
										<a href="./info"> Read more...</a>
									</Typography>
									<Button variant="contained" color="primary">
										Explore ↪{' '}
									</Button>
								</div>
							</div>
						</Box>

						<Container className="updates">
							<ImageList
								className="updates"
								gap={12}
								sx={{
									mb: 8,
								}}
							>
								{' '}
								{images &&
									images.data.map((data) => {
										return (
											<Card className="games">
												<ImageListItem key={data.id}>
													<CardMedia
														image={data.src}
														className="media"
													/>
													<CardContent className="content">
														<Typography className="name">
															{data.name}
														</Typography>
														<IconButton
															onClick={() =>
																setMainContext({
																	type: 'SET_DESC',
																	payload: descr,
																})
															}
														>
															{' '}
															<MoreVertIcon
																sx={{ cursor: 'pointer' }}
															/>
														</IconButton>
													</CardContent>
												</ImageListItem>
												{descr && (
													<Box style={{ padding: '.6rem' }}>
														<Typography>
															{' '}
															{data.description}
														</Typography>
													</Box>
												)}
											</Card>
										);
									})}
							</ImageList>
						</Container>
					</Stack>
				</Box>

				<Box className="left__box ">
					<section className="d-flex flex-column">
						<a
							className="btn btn-primary btn-floating "
							style={{ backgroundcolor: ' #3b5998' }}
							href="#!"
							role="button"
						>
							<i className="fab fa-facebook-f"></i>
						</a>

						<a
							className="btn btn-primary btn-floating m-1"
							style={{ backgroundcolor: '#55acee' }}
							href="#!"
							role="button"
						>
							<i className="fab fa-twitter"></i>
						</a>

						<a
							className="btn btn-primary btn-floating m-1"
							style={{ backgroundColor: '#dd4b39' }}
							href="#!"
							role="button"
						>
							<i className="fab fa-google"></i>
						</a>

						<a
							className="btn btn-primary btn-floating m-1"
							style={{ backgroundColor: ' #ac2bac' }}
							href="#!"
							role="button"
						>
							<i className="fab fa-instagram"></i>
						</a>

						<a
							className="btn btn-primary btn-floating m-1"
							style={{ backgroundColor: ' #0082ca' }}
							href="#!"
							role="button"
						>
							<i className="fab fa-linkedin-in"></i>
						</a>

						<a
							className="btn btn-primary btn-floating m-1"
							style={{ backgroundColor: ' #333333' }}
							href="#!"
							role="button"
						>
							<i className="fab fa-github"></i>
						</a>
					</section>
				</Box>
			</Stack>
		</>
	);
};

export default Feed;
