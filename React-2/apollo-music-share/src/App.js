import React, { createContext, useContext, useReducer } from 'react';
import { Grid, Hidden, useMediaQuery } from '@material-ui/core';
import Header from './components/Header';
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import SongPlayer from './components/SongPlayer';
import songReducer from './reducer';

export const SongContext = createContext({
	song: {
		id: '184002f5-6c93-4084-8060-a38630fdd9e2',
		artist: 'NAND',
		thumbnail: 'http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg',
		url: 'https://youtu.be/xeM40-FkRLI',
		duration: 250
	},
	isPlaying: false
});

function App() {
	// Consuming SongContext
	const initialSongState = useContext(SongContext);
	const [state, dispatch] = useReducer(songReducer, initialSongState);
	const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
	const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

	return (
		<SongContext.Provider value={{ state, dispatch }}>
			<Hidden only='xs'>
				<Header />
			</Hidden>
			<Grid container spacing={3}>
				<Grid
					style={{
						paddingTop: greaterThanSm ? 80 : 10
					}}
					item
					xs={12}
					md={7}
				>
					<AddSong />
					<SongList />
				</Grid>
				<Grid
					style={
						greaterThanMd
							? {
									position: 'fixed',
									width: '100%',
									right: 0,
									top: 70
							  }
							: {
									position: 'fix',
									width: '100%',
									left: 0,
									bottom: 0
							  }
					}
					item
					xs={12}
					md={5}
				>
					<SongPlayer />
				</Grid>
			</Grid>
		</SongContext.Provider>
	);
}

export default App;
