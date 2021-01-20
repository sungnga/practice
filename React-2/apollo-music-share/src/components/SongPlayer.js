import { useQuery } from '@apollo/client';
import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	makeStyles,
	Slider,
	Typography
} from '@material-ui/core';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons';
import React, { Fragment, useContext, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { SongContext } from '../App';
import { GET_QUEUED_SONGS } from '../graphql/queries';
import QueuedSongList from './QueuedSongList';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0px 15px'
	},
	content: {
		flex: '1 0 auto'
	},
	thumbnail: {
		width: 150
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1)
	},
	playIcon: {
		height: 38,
		width: 38
	}
}));

function SongPlayer() {
	const { data } = useQuery(GET_QUEUED_SONGS);
	const { state, dispatch } = useContext(SongContext);
	const [played, setPlayed] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const reactPlayerRef = useRef();
	const classes = useStyles();

	function handleTogglePlay() {
		dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
	}

	function handleProgressChange(event, newValue) {
		setPlayed(newValue);
	}

	function handleSeekMouseDown() {
		setSeeking(true);
	}

	function handleSeekMouseUp() {
		setSeeking(false);
		reactPlayerRef.current.seekTo(played);
	}

	return (
		<Fragment>
			<Card variant='outlined' className={classes.container}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography variant='h5' component='h3'>
							{state.song.title}
						</Typography>
						<Typography variant='subtitle1' component='p' color='textSecondary'>
							{state.song.artist}
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton>
							<SkipPrevious />
						</IconButton>
						<IconButton onClick={handleTogglePlay}>
							{state.isPlaying ? (
								<Pause className={classes.playIcon} />
							) : (
								<PlayArrow className={classes.playIcon} />
							)}
						</IconButton>
						<IconButton>
							<SkipNext />
						</IconButton>
						<Typography variant='subtitle1' component='p' color='textSecondary'>
							00:01:30
						</Typography>
					</div>
					<Slider
						onMouseDown={handleSeekMouseDown}
						onMouseUp={handleSeekMouseUp}
						onChange={handleProgressChange}
						value={played}
						type='range'
						min={0}
						max={1}
						step={0.01}
					/>
				</div>
				<ReactPlayer
					ref={reactPlayerRef}
					onProgress={({ played, playedSeconds }) => {
						if (!seeking) {
							setPlayed(played);
						}
					}}
					url={state.song.url}
					playing={state.isPlaying}
					hidden
				/>
				<CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
			</Card>
			<QueuedSongList queue={data.queue} />
		</Fragment>
	);
}

export default SongPlayer;
