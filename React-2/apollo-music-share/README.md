# NOTES WHILE BUILDING THIS APPLICATION

### Setting up project:
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


## 1. MATERIAL UI

### Building our app UI using Material UI:
- Our components:
  - App.js: the parent component that renders our other components and passes down any props or context
  - AddSong.js: an input form that user can submit a song link from Youtube or Soundcloud. When they click on the Add button, a dialog window pops up that allows user to edit song title, artist, and image thumbnail
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
- After a user pasted in a song url and clicks on the Add button, a dialog window pops up that allows them to edit the song title, artist, and image thumbnail
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


## 2. INTEGRATING GRAPHQL WITH SUBSCRIPTIONS

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
- We want to fetch songs from the database and display them in song list section in the order of most recent songs first
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

### Implementing add song functionality:
- The next step is to dynamically add songs to the song list. We want to be able to provide a song URL in an input form. The AddSong component is going to check to see whether it's valid and the song can be played. The React Player tool is going to help us with this functionality. If the song can be played, the Edit Song dialog window will enable users to edit the song's title, artist name, and thumbnail image
- Install react-player: `npm i react-player`
- In src/components/AddSong.js file:
  - Import SoundcloudPlayer and YoutubePlayer from react-player
  - Create a url state and initialize it to an empty string
  - Add an `onChange` event handler to the `<TextField />` component that calls the setUrl function to set the url state to `event.target.value`. We also want to make this a controlled form, so set the value attribute to the url state
  - Use useEffect hook that's going to run some code when there's a change in the url state
    - We're going to use the `SoundcloudPlayer.canPlay()` or the `YoutubePlayer.canPlay()`method on the given url to see if it can be played with SoundcloudPlayer or YoutubePlayer
    - Assign the returned value to isPlayable variable
    - Then call setPlayable function to set playable state to this returned value
  - We want to store this value in a piece of state. So create a playable state and by default, set it to be false. This means that, by default, the Add button is disabled
  - If the playable state is equal to false, meaning the given url can't be played, we want to disable the Add button
  ```js
  import SoundcloudPlayer from 'react-player/lib/players/SoundCloud';
  import YoutubePlayer from 'react-player/lib/players/YouTube';

  function AddSong() {
    const [url, setUrl] = useState('');
    const [playable, setPlayable] = useState(false);
    
    useEffect(() => {
      const isPlayable =
        SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
      setPlayable(isPlayable);
    }, [url]);

    return (
      <TextField
        onChange={(event) => setUrl(event.target.value)}
        value={url}
      />
      <Button disabled={!playable}>Add</Button>
    )
  }
  ```

### Extracting song data from ReactPlayer to Edit Song dialog:
- ReactPlayer docs: https://www.npmjs.com/package/react-player
- **Extracting song data from ReactPlayer component:**
- The ReactPlayer component can play songs, but we can also use it to extract the song data from it
- In src/components/AddSong.js file:
  - Import ReactPlayer component from react-player
  - We're going to render the ReactPlayer component but it's going to be hidden
    - It has a url prop and we're going to pass our url state to it
    - Add the hidden attribute to hide this component
    - The `onReady` callback is going to be fired and provides all the song data from the url when the ReactPlayer is loaded
    - We're going to pass that song data to a function called handleEditSong
  - Write a handleEditSong function
    - This function receives player property as a parameter
    - The nested player we want is nested in this player property. So get this player from the player object and assign it to a nestedPlayer variable
    - Then write an if statement to see if there's a specify method that exists on the player. This helps us determine whether it is from Youtube or Soundcloud
      - If there's a getVideoData method on the player, call the getYoutubeInfo function to get the song data
      - If there's a getCurrentSound method on the player, call the getSoundcloudInfo function to get the song data
    - We need to wait for the song info, so mark the handleEditSong function as an async function
  - Write a getYoutubeInfo function that returns the song info object
    - This function receives a player as a parameter
    - This function calls the getVideoData() method on player to get the song data
  - Write a getSoundcloudInfo function that returns the song info object
    - This function receives a player as a parameter
    - This function calls the getCurrentSound() method on player to get the song data
    - The getCurrentSound() method is an async function, so it returns a promise
      - pass in a callback that receives the songData and returns a song info object
  - Next thing is we need to create a state that keeps track of the song info object
    - Call this state `song`
    - The default value is an object that contains the song info properties and they're all initialized with empty strings
  - Lastly, in the handleEditSong function, call to setSong function to set the songData object to song state. We also want to set the url state (contains the song url the user entered) as property in our song state
  ```js
  import ReactPlayer from 'react-player';

  function AddSong() {
    const [url, setUrl] = useState('');
    const [song, setSong] = useState({
      duration: 0,
      title: '',
      artist: '',
      thumbnail: ''
    });

      async function handleEditSong({ player }) {
      const nestedPlayer = player.player.player;
      let songData;
      // If there's a getVideoData method, we can assume the link is from Youtube
      // Else if there's a getCurrentSound method, we can assume the link is from Soundcloud
      if (nestedPlayer.getVideoData) {
        songData = getYoutubeInfo(nestedPlayer);
      } else if (nestedPlayer.getCurrentSound) {
        songData = await getSoundcloudInfo(nestedPlayer);
      }
      setSong({ ...songData, url });
    }

    function getYoutubeInfo(player) {
      const duration = player.getDuration();
      // getVideoData method returns an object
      // destructure the properties from it
      const { title, video_id, author } = player.getVideoData();
      const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
      return {
        duration,
        title,
        artist: author,
        thumbnail
      };
    }

    function getSoundcloudInfo(player) {
      return new Promise((resolve) => {
        player.getCurrentSound((songData) => {
          if (songData) {
            resolve({
              duration: Number(songData.duration / 1000),
              title: songData.title,
              artist: songData.user.username,
              thumbnail: songData.artwork_url.replace('-large', '-t500x500')
            });
          }
        });
      });
    }

    return (
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    )
  }
  ```
- **Displaying song data in Edit Song dialog:**
- In src/components/AddSong.js file:
  - In the AddSong component and just above the return, destructure the title, artist, and thumbnail properties from song object. This way we can provide all of the text fields the values that had been provided in song state
  - In the image element, set the src attribute to thumbnail
  - Set the value attributes for title, artist, and thumbnail text fields to title, artist, and thumbnail
  - Now that we're displaying the song info, we want to be able to edit the text fields
  - For onChange event handler for each of the 3 text fields, call the handleChangeSong method
  - Write a handleChangeSong function that sets song state of its corresponding name with its corresponding value from event.target that the user provides

  ```js
	function handleChangeSong(event) {
		const { name, value } = event.target;
		setSong((prevSong) => ({
			...prevSong,
			[name]: value
		}));
  }
  
  const { thumbnail, title, artist } = song;
  return (
    <DialogContent>
      <img
        src={thumbnail}
        onChange={handleChangeSong}
        alt='Song thumbnail'
        className={classes.thumbnail}
      />
      <TextField
        value={title}
        onChange={handleChangeSong}
        margin='dense'
        name='title'
        label='Title'
        fullWidth
      />
      <TextField
        value={artist}
        onChange={handleChangeSong}
        margin='dense'
        name='artist'
        label='Artist'
        fullWidth
      />
      <TextField
        value={thumbnail}
        margin='dense'
        name='thumbnail'
        label='Thumbnail'
        fullWidth
      />
    </DialogContent>
  )
  ```

### Performing an addSong mutation:
- Before a user can add a song to the database, we want to add some form validation to the Edit Song form to make sure that all text fields are filled out
- We're going to be using an error from the server to figure out whether the form is valid or not. If one of the fields isn't filled out, we will display a message to the user to fill out the field
- **Defining the ADD_SONG mutation:**
- In src/graphql/mutations.js file:
  - Create an ADD_SONG mutation
  ```js
  import { gql } from '@apollo/client';

  export const ADD_SONG = gql`
    mutation addSong(
      $title: String!
      $artist: String!
      $thumbnail: String!
      $duration: Float!
      $url: String!
    ) {
      insert_songs(
        objects: {
          title: $title
          artist: $artist
          thumbnail: $thumbnail
          duration: $duration
          url: $url
        }
      ) {
        affected_rows
      }
    }
  `;
  ```
- **Execute the ADD_SONG mutation in React:**
- In src/components/AddSong.js file:
  - Import useMutation hook from @apollo/client
  - Name import the ADD_SONG mutation
  - Call useMutation() to execute a mutation. So pass in the ADD_SONG as an argument to execute the addSong mutation. What we get back is an addSong function. We can also destructure the error property which contains the error data provided by GraphQL
  - We want to execute this addSong function when the user clicks on the Add Song button
  - In the Add Song button element, execute the handleAddSong function for the onClick event handler
  - Write an async handleAddSong function that executes the addSong function to add the song object to the database
    - Use a try/catch block to try to execute the addSong function and catch any errors
    - Since the addSong function returns a promise, we need to await it
    - Before adding the song to the database, we want to make sure each required property is provided a value. If not, set the property value to null. If provided, set that value
    - Once a song has been added to the database (addSong function is completed), we want to close the dialog window, clear the song text fields, and clear the url input field
    - If there's an error, we want to render an error message for that specific field to the user
      - How it works is we can get the error object coming from GraphQL when calling `useMutation()`. We can destructure this error object so we can use it to handleError
      - Write a handleError function that's going to accept a field as a parameter. Then check to see if there's an error in the error object. If there is, return the path, which contains the field name that's causing the error. The path lives in the networkError property
      - In each of the TextField element, add the error property to execute the handleError method. The handleError() will accept the name of the text field as an argument
      - Then use the helpText property to display a message to the user of what they need to do to fix the error
  ```js
  import { useMutation } from '@apollo/client';
  import { ADD_SONG } from '../graphql/mutations';

  const DEFAULT_SONG = {
    duration: 0,
    title: '',
    artist: '',
    thumbnail: ''
  };

  function AddSong() {
    // The error property contains the error data
    const [addSong, { error }] = useMutation(ADD_SONG);

    async function handleAddSong() {
      try {
        const { title, artist, thumbnail, duration, url } = song;
        // addSong({ variables: { ...song } });
        await addSong({
          variables: {
            url: url.length > 0 ? url : null,
            thumbnail: thumbnail.length > 0 ? thumbnail : null,
            duration: duration > 0 ? duration : null,
            title: title.length > 0 ? title : null,
            artist: artist.length > 0 ? artist : null
          }
        });
        handleCloseDialog();
        setSong(DEFAULT_SONG);
        setUrl('');
      } catch (error) {
        console.error('Error adding song', error);
      }
    }

    function handleError(field) {
      // Using optional chaining operator
      return error?.networkError?.extensions?.path.includes(field);
    }

    return (
      <DialogContent>
        <img
          src={thumbnail}
          alt='Song thumbnail'
          className={classes.thumbnail}
        />
        <TextField
          value={title}
          onChange={handleChangeSong}
          margin='dense'
          name='title'
          label='Title'
          fullWidth
          error={handleError('title')}
          helperText={handleError('title') && 'Fill out field'}
        />
        <TextField
          value={artist}
          onChange={handleChangeSong}
          margin='dense'
          name='artist'
          label='Artist'
          fullWidth
          error={handleError('artist')}
          helperText={handleError('artist') && 'Fill out field'}
        />
        <TextField
          value={thumbnail}
          onChange={handleChangeSong}
          margin='dense'
          name='thumbnail'
          label='Thumbnail'
          fullWidth
          error={handleError('thumbnail')}
          helperText={handleError('thumbnail') && 'Fill out field'}
        />
      </DialogContent>
      <Button onClick={handleAddSong} variant='outlined' color='primary'>
        Add Song
      </Button>
    )
  }
  ```

### Adding subscriptions for realtime updates:
- Apollo websocket docs: https://www.apollographql.com/docs/link/links/ws/
- Apollo subscriptions docs: https://www.apollographql.com/docs/react/data/subscriptions/#setting-up-the-transport
- The last step we need to do in ADD_SONG mutation is in order to render the newly added song to the song list in realtime, we need to add subscriptions. So instead of using a GET_SONGS query to list the songs, we want to replace it with a subscription
- We need to install some packages to help us with this. With Apollo Client v3.0, we only need to install:
  - `npm i @apollo/client subscriptions-transport-ws`
- **Reconfigure Apollo Client to include Websocket:**
  - In src/graphql/client.js file:
    ```js
    import { ApolloClient, InMemoryCache } from '@apollo/client';
    import { WebSocketLink } from '@apollo/client/link/ws';

    const client = new ApolloClient({
      link: new WebSocketLink({
        uri: 'wss://ngala-music-share.hasura.app/v1/graphql',
        options: {
          reconnect: true
        }
      }),
      cache: new InMemoryCache()
    });

    export default client;
    ```
- **Defining GET_SONGS subscription:**
  - In src/graphql/subscriptions.js file:
    - Copy the GET_SONGS query from queries.js file and paste it in this file
    - Then instead of using the `query` keyword, replace it with `subscription` keyword
    ```js
    import { gql } from '@apollo/client';

    export const GET_SONGS = gql`
      subscription getSongs {
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
- **Client-side: using GET_SONGS subscription:**
  - In src/components/SongList.js file:
    - Import useSubscription hook instead of useQuery hook from @apollo/client
    - Import GET_SONGS from subscriptions.js file instead of from queries.js file
    - Then in the SongList component we want to call `useSubscription` instead of `useQuery`
    ```js
    import { useSubscription } from '@apollo/client';
    import { GET_SONGS } from '../graphql/subscriptions';

    const { data, loading, error } = useSubscription(GET_SONGS);
    ```
- Now we're subscribed to any new data changes


## 3. MANAGING STATE WITH REACT AND APOLLO

### Setting up state management:
- The next functionality we want to work on is when a user clicks on the play button of a song on song list, we want to transport that song data to the SongPlayer component and use ReactPlayer to actually play the song. We also want to keep the song in the SongPlayer and song playing on SongList in sync with one another. When the song is playing, both should display a pause button indicating to the user that they can pause the song
- There are a couple of states that we want to keep track of:
  - the song that we're going to be playing
  - whether the song is playing or not
- We'll be using a combination of useReducer and useContext to manage the states across components 
- **Setup state management using context and reducer:**
- In src/App.js file:
  - Import createContext, useContext and useReducer hooks from react
  - Start out by creating a SongContext using createContext() function. Do this just above and outside of the App component
    - Pass to this function an object which contains the states we want to manage
    - Define a song state, which is an object. For now, we can just hard-code the values
    - Define an isPlaying state, which is a boolean and by default, it is set to false
    - Name export SongContext
  - Inside the App component:
    - Consume the SongContext by using React useContext() hook. Pass in the SongContext as an argument. What we get back is the initialSongState
    - Then pass this initialSongState as a 2nd argument to the useReducer() hook from react. The 1st argument to pass to the useReducer() is the reducer function. What we get back from useReducer() hook is the `state` and the `dispatch`
    - Write a songReducer function in reducer.js file and export it
    - Import songReducer and pass it in to the useReducer() hook as 1st arg
    - In the return section of the App component, wrap the `<SongContext.Provider />` component around all of the other components. Pass down the `value` props of an object that contains the state and the dispatch
  ```js
  import React, { createContext, useContext, useReducer } from 'react';
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

    return (
      <SongContext.Provider value={{ state, dispatch }}>
        // components go here
      </SongContext.Provider>
    )
  }
  ```
- In src/reducer.js file:
  ```js
  function songReducer(state, action) {
    switch (action.type) {
      default:
        return state;
    }
  }

  export default songReducer;
  ```




## NPM PACKAGES USED
- material-ui and material-ui icons: `npm i @material-ui/core @material-ui/icons`
- apollo-client and graphql: `npm install @apollo/client graphql`
- react-player: `npm i react-player`
  - docs: https://www.npmjs.com/package/react-player
- apollo websocket, subscriptions, and cache: `npm i @apollo/client  subscriptions-transport-ws`