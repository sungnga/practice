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
import { PlayArrow, Save } from '@material-ui/icons';
import React from 'react';

function SongList() {
	let loading = false;

	const song = {
		title: 'Overcrest',
		artist: 'NAND',
		thumbnail:
			'https://i.ytimg.com/an_webp/8GW6sLrK40k/mqdefault_6s.webp?du=3000&sqp=CODK-f8F&rs=AOn4CLAjc8sCqsczPHBNgpuxAkBcIsuFoQ'
	};

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

	return (
		<div>
			{Array.from({ length: 10 }, () => song).map((song, i) => (
				<Song key={i} song={song} />
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
		width: 140,
		height: 140
	}
}));

function Song({ song }) {
	const classes = useStyles();
	const { title, artist, thumbnail } = song;
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
						<IconButton size='small' color='primary'>
							<PlayArrow />
						</IconButton>
						<IconButton size='small' color='secondary'>
							<Save color='secondary' />
						</IconButton>
					</CardActions>
				</div>
			</div>
		</Card>
	);
}
export default SongList;
