import { useMutation } from '@apollo/client';
import {
	Avatar,
	IconButton,
	makeStyles,
	Typography,
	useMediaQuery
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

function QueuedSongList({ queue }) {
	console.log({ queue });
	const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

	// const song = {
	// 	title: 'Overcrest',
	// 	artist: 'NAND',
	// 	thumbnail: 'http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg'
	// };

	return (
		greaterThanMd && (
			<div style={{ margin: '10px 0' }}>
				<Typography color='textSecondary' variant='button'>
					QUEUE ({queue.length})
				</Typography>
				{queue.map((song, i) => (
					<QueuedSong key={i} song={song} />
				))}
			</div>
		)
	);
}

const useStyles = makeStyles({
	avatar: {
		width: 44,
		height: 44
	},
	text: {
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},
	container: {
		display: 'grid',
		gridAutoFlow: 'column',
		gridTemplateColumns: '50px auto 50px',
		gridGap: 12,
		alignItems: 'center',
		marginTop: 10
	},
	songInfoContainer: {
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	}
});

function QueuedSong({ song }) {
	const classes = useStyles();
	const { title, artist, thumbnail } = song;
	const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);

	function handleAddOrRemoveFromQueue() {
		addOrRemoveFromQueue({
			// spread in all of the song data
			variables: { input: { ...song, __typename: 'Song' } }
		});
	}

	return (
		<div className={classes.container}>
			<Avatar src={thumbnail} alt='Song thumbnail' className={classes.avatar} />
			<div className={classes.songInfoContainer}>
				<Typography variant='subtitle2' className={classes.text}>
					{title}
				</Typography>
				<Typography
					color='textSecondary'
					variant='body2'
					className={classes.text}
				>
					{artist}
				</Typography>
			</div>
			<IconButton onClick={handleAddOrRemoveFromQueue}>
				<Delete color='error' />
			</IconButton>
		</div>
	);
}

export default QueuedSongList;
