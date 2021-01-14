import React, { useEffect, useState } from 'react';
import {
	InputAdornment,
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	makeStyles
} from '@material-ui/core';
import {
	AddBoxOutlined,
	FormatListNumberedRounded,
	Link
} from '@material-ui/icons';
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud';
import YoutubePlayer from 'react-player/lib/players/YouTube';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center'
	},
	urlInput: {
		margin: theme.spacing(1)
	},
	addSongButton: {
		margin: theme.spacing(1)
	},
	dialog: {
		textAlign: 'center'
	},
	thumbnail: {
		width: '90%'
	}
}));

function AddSong() {
	const classes = useStyles();
	const [dialog, setDialog] = useState(false);
	const [url, setUrl] = useState('');
	const [playable, setPlayable] = useState(false);

	useEffect(() => {
		const isPlayable =
			SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
		setPlayable(isPlayable);
	}, [url]);

	function handleCloseDialog() {
		setDialog(false);
	}

	return (
		<div className={classes.container}>
			<Dialog
				className={classes.dialog}
				open={dialog}
				onClose={handleCloseDialog}
			>
				<DialogTitle>Edit Song</DialogTitle>
				<DialogContent>
					<img
						src='https://res.cloudinary.com/sungnga/image/upload/c_scale,w_305/v1609899670/YelpCamp/niunllvag8xki2p6nmry.jpg'
						alt='Song thumbnail'
						className={classes.thumbnail}
					/>
					<TextField margin='dense' name='title' label='Title' fullWidth />
					<TextField margin='dense' name='artist' label='Artist' fullWidth />
					<TextField
						margin='dense'
						name='thumbnail'
						label='Thumbnail'
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color='secondary'>
						Cancel
					</Button>
					<Button variant='outlined' color='primary'>
						Add Song
					</Button>
				</DialogActions>
			</Dialog>
			<TextField
				onChange={(event) => setUrl(event.target.value)}
				value={url}
				className={classes.urlInput}
				placeholder='Add Youtube or Soundcloud Url'
				fullWidth
				margin='normal'
				type='url'
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Link />
						</InputAdornment>
					)
				}}
			/>
			<Button
				disabled={!playable}
				className={classes.addSongButton}
				onClick={() => setDialog(true)}
				variant='contained'
				color='primary'
				endIcon={<AddBoxOutlined />}
			>
				Add
			</Button>
		</div>
	);
}

export default AddSong;
