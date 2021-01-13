import React, { Fragment } from 'react';
import Header from './components/Header';
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import SongPlayer from './components/SongPlayer';
import { Grid } from '@material-ui/core';

function App() {
	return (
		<Fragment>
			<Header />
			<Grid container spacing={3}>
        <Grid style={{
          paddingTop: 80
        }} item xs={12} md={7}>
					<AddSong />
					<SongList />
				</Grid>
				<Grid item xs={12} md={5}>
					<SongPlayer />
				</Grid>
			</Grid>
		</Fragment>
	);
}

export default App;
