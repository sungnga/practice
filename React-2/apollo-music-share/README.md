# NOTES ON MATERIAL-UI

## SETUP PROJECT
- Create a react project: `npx create-react-app apollo-music-share --use-npm`
- Install material-ui and material-ui icons: `npm i @material-ui/core @material-ui/icons`
- In src folder, only have index.js and App.js files
- Starter code in index.js file:
  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';

  ReactDOM.render(<App />, document.getElementById('root'));
  ```
- Starter code in App.js file:
  ```js
  import React from 'react';

  function App() {
    return <h1>App</h1>;
  }

  export default App;
  ```
- To start the project, run: `npm run start`
- Open http://localhost:3000 to view it in the browser


## MATERIAL UI

### Building our app UI using Material UI:
- Our components:
  - App.js: the parent component that renders our other components and passes down any props or context
  - AddSong.js: an input form that user can submit a song link from Youtube or Soundcloud. When they click on the Add Song button, a dialog window pops up that allows user to edit song title, artist, and image thumbnail
  - Header.js: displays the title of our app
  - SongList.js: renders the song list with song title, artist, and image thumbnail, Play and Save buttons
  - SongPlayer.js: displays the song title, artist and image thumbnail, song duration slider, and play previous, play next, and play icons
  - QueuedSongList.js: lists the songs in queue. User can also delete a song from this list

### Material-ui custom styles and theme:
- Material-ui comes with a function called `makeStyles` that we can use to add customize styles for individual components. `makeStyles` is going to hold all the style components for a given component element
- `makeStyles` accepts an object and on it, we can set individual properties
- So we can write our own custom hook that executes the `makeStyle` function and returns an object. Then we can use this object anywhere in our component to apply the style
- In Header.js file:
  ```js
  import React from 'react';
  import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
  import { HeadsetTwoTone } from '@material-ui/icons';

  const useStyles = makeStyles((theme) => ({
    title: {
      marginLeft: theme.spacing(2)
    }
  }));

  function Header() {
    const classes = useStyles();
    return (
      <AppBar color='primary' position='fixed'>
        <Toolbar>
          <HeadsetTwoTone />
          <Typography className={classes.title} variant='h6' component='h1'>
            Apollo Music Share
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  export default Header;
  ```
- We can also pass `theme` data to the `makeStyles` function. `theme` allows us to set element attributes without hard-coding a value
- Create a theme in a separate theme.js file. There's a function called `createMuiTheme` that we can use to create material-ui theme
- In src/theme.js file:
  ```js
  import { createMuiTheme } from '@material-ui/core/styles';
  import { purple, teal } from '@material-ui/core/colors';

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: teal,
      secondary: purple
    }
  });

  export default theme;
  ```
- Next is we want to make available the theme to all of our components. This can be done using a context provider. Material-ui has a `MuiThemeProvider` that we can use
- In index.js file:
  - Import our theme.js file
  - Wrap the `MuiThemeProvider` component around the App component
  - Then pass down our theme through the `theme` props
  ```js
  import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
  import React from 'react';
  import ReactDOM from 'react-dom';
  // import { MuiThemeProvider } from '@material-ui/core';
  import App from './App';
  import theme from './theme';

  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>,
    document.getElementById('root')
  );
  ```

### Build AddSong component:
- After a user pasted in a song url and clicks on the Add Song button, a dialog window pops up that allows them to edit the song title, artist, and image thumbnail
- In AddSong.js file:
  - Use makeStyles function from material-ui to customize styles
  ```js
  import React, { useState } from 'react';
  import { InputAdornment, TextField, Button, Dialog, DialogTitle, DialogContent DialogActions, makeStyles } from '@material-ui/core';
  import { AddBoxOutlined, Link } from '@material-ui/icons';

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
  ```

### Build the SongList.js, SongPlayer.js, and QueuedSongList.js components

### Apply responsive design using useMediaQuery hook and Hidden component:
- In app.js file:
  - At medium or smaller screen-size breakpoint, we want to display the song player fixed at the bottom of the screen. We also want to remove the queued song list
  - At extra-small breakpoint, we want to remove the header
  ```js
  import { Hidden, useMediaQuery } from '@material-ui/core';

  function App() {
    const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

    return (
      <Fragment>
        <Hidden only='xs'>
          <Header />
        </Hidden>
        //The rest of the code...
      </Fragment>
    )
  }
  ```


## INTEGRATING GRAPHQL WITH SUBSCRIPTIONS

### Creating songs database using Hasura GraphQL:
- Login to Hasura website and create a new project. Give the project a name
- Go to the DATA tab at the top to create our database:
  - Name the table: songs
  - Define the fields in Columns section
    - id : type of UUID : value of gen_random_uuid()
    - title : type of Text
    - artist : type of Text
    - thumbnail : type of Text
    - url : type of Text
    - duration : type of real (real is a float type scalar)
    - created_at : type of Timestamp : value of now()
  - Set Primary Key: id
  - Lastly, click on the Add Table button
- We can see the `songs` table shows up on the left menu
- Go to GRAPHIQL tab and we should see our songs schema that we can perform query, mutation, or subscription

### Configuring Apollo Client:
- Install: `npm install @apollo/client graphql`
- We need to setup our client by instantiating a new client
- Our client is going to keep track of all of our settings, what endpoint we're going to be making request to, and it's going to create our cache
- Go to Hasura GraphQL API and copy the GraphQL server's Endpoint/URl and set it to the `uri` property of the constructor's configuration object
- In src/graphql/client.js file:
  ```js
  import { ApolloClient, InMemoryCache } from '@apollo/client';

  // Instantiate a new client
  const client = new ApolloClient({
    uri: 'https://ngala-music-share.hasura.app/v1/graphql',
    cache: new InMemoryCache()
  });

  export default client;
  ```

### Connecting our client to React:
- We connect Apollo Client to React with the `ApolloProvider` component. The `ApolloProvider` is similar to React's `Context.Provider`. It wraps our React app and places the client on the context, which enables us to access it from anywhere in our component tree
- In index.js file:
  - Import ApolloProvider component from @apollo/client
  - Import our apollo client
  - Wrap the ApolloProvider component around the MuiThemeProvider component
  - In the ApolloProvider component, pass the client props and set it to the client instance we just created  
  ```js
  import { ApolloProvider } from '@apollo/client';
  import client from './graphql/client';

  ReactDOM.render(
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
  ```

### Performing a getSongs query:
- In src/graphql/queries.js file:
  - The songs that get sent back to the client will be in descending order by created_at - most recent songs first
  - The query inside the gql template string was performed in Hasura's GraphiQL console before hand to make sure that we do get the data back
  ```js
  import { gql } from '@apollo/client';

  export const GET_SONGS = gql`
    query getSongs {
      songs(order_by: { created_at: desc }) {
        artist
        duration
        id
        thumbnail
        title
        url
      }
    }
  `;
  ```
- In SongList.js file:
  - Import useQuery hook from @apollo/client
  - Name import the GET_SONGS query
  - Call useQuery() hook from Apollo Client within our React component to make a request to fetch songs from the database. Pass in GET_SONGS query as an argument because this is the type of query we want to perform
  - What we get back are the data, loading and error property objects. Destructure them here
  - If there's an error in GET_SONGS query, display a message that says, Error fetching songs
  - If we do get songs data back, map over the songs array and use the Song component to render the song list. Pass down the song as props to the Song child component
  ```js
  import { useQuery } from '@apollo/client';
  import { GET_SONGS } from '../graphql/queries';

  function SongList() {
    const { data, loading, error } = useQuery(GET_SONGS);

    if (error) return <div>Error fetching songs</div>;

    return (
      <div>
        {data.songs.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </div>
    );

  }
  ```