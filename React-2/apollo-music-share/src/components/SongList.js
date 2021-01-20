import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	CircularProgress,
	IconButton,
	makeStyles,
	Typography
} from '@material-ui/core';
import { Pause, PlayArrow, Save } from '@material-ui/icons';
import { GET_SONGS } from '../graphql/subscriptions';
import { SongContext } from '../App';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

function SongList() {
	const { data, loading, error } = useSubscription(GET_SONGS);

	// const song = {
	// 	title: 'Overcrest',
	// 	artist: 'NAND',
	// 	thumbnail:
	// 		'http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg'
	// };

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 50
				}}
			>
				<CircularProgress />
			</div>
		);
	}
	if (error) return <div>Error fetching songs</div>;

	return (
		<div>
			{data.songs.map((song) => (
				<Song key={song.id} song={song} />
			))}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(3)
	},
	songInfoContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	songInfo: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between'
	},
	thumbnail: {
		objectFit: 'cover',
		width: 150,
		height: 150
	}
}));

function Song({ song }) {
	const { id } = song;
	const classes = useStyles();
	const { title, artist, thumbnail } = song;
	const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);
	const { state, dispatch } = useContext(SongContext);
	const [currentSongPlaying, setCurrentSongPlaying] = useState(false);

	useEffect(() => {
		const isSongPlaying = state.isPlaying && id === state.song.id;
		setCurrentSongPlaying(isSongPlaying);
	}, [id, state.song.id, state.isPlaying]);

	function handleTogglePlay() {
		dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
		dispatch({ type: 'SET_SONG', payload: { song } });
	}

	function handleAddOrRemoveFromQueue() {
		addOrRemoveFromQueue({
			// spread in all of the song data
			variables: { input: { ...song, __typename: 'Song' } }
		});
	}

	return (
		<Card className={classes.container}>
			<div className={classes.songInfoContainer}>
				<CardMedia image={thumbnail} className={classes.thumbnail} />
				<div className={classes.songInfo}>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{title}
						</Typography>
						<Typography variant='body1' component='p' color='textSecondary'>
							{artist}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton onClick={handleTogglePlay} size='small' color='primary'>
							{currentSongPlaying ? <Pause /> : <PlayArrow />}
						</IconButton>
						<IconButton
							onClick={handleAddOrRemoveFromQueue}
							size='small'
							color='secondary'
						>
							<Save />
						</IconButton>
					</CardActions>
				</div>
			</div>
		</Card>
	);
}
export default SongList;
