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


## MATERIAL UI

### 1. Building our app UI using Material UI:
- Our components:
  - App.js: the parent component that renders our other components and passes down any props or context
  - AddSong.js: an input form that user can submit a song link from Youtube or Soundcloud. When they click on the Add button, a dialog window pops up that allows user to edit song title, artist, and image thumbnail
  - Header.js: displays the title of our app
  - SongList.js: renders the song list with song title, artist, and image thumbnail, Play and Save buttons
  - SongPlayer.js: displays the song title, artist and image thumbnail, song duration slider, and play previous, play next, and play icons
  - QueuedSongList.js: lists the songs in queue. User can also delete a song from this list

### 2. Material-ui custom styles and theme:
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

### 3. Build AddSong component:
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

### 4. Build the SongList.js, SongPlayer.js, and QueuedSongList.js components

### 5. Apply responsive design using useMediaQuery hook and Hidden component:
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

### 1. Creating songs database using Hasura GraphQL:
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

### 2. Configuring Apollo Client:
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

### 3. Connecting our client to React:
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

### 4. Performing a getSongs query operation:
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

### 5. Implementing add song functionality:
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

### 5. Extracting song data from ReactPlayer to Edit Song dialog:
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

### 6. Performing an addSong mutation:
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

### 7. Adding subscriptions for realtime updates:
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


## MANAGING STATE WITH REACT AND APOLLO

### 1. Setting up state management:
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

### 2. Managing states and consuming SongContext:
- **Consuming SongContext in SongPlayer component:**
  - In the SongPlayer component, we want to consume the SongContext because we want to render the song title, artist, and thumbnail dynamically
  - In SongPlayer.js file:
    - Import useContext hook from react
    - Name import the SongContext from App component
    - Call useContext() hook and pass in SongContext as an argument to consume SongContext. What we get back from useContext() is the state object and the dispatch function. We can destructure those
    - Then instead of using static title, artist, and thumbnail text, use state.song.title to render them dynamically
    ```js
    import { useContext } from 'react';
    import { SongContext } from '../App';

    function SongPlayer() {
      const { state, dispatch } = useContext(SongContext);

      return (
        <Typography variant='h5' component='h3'>
          {state.song.title}
        </Typography>
      )
    }
    ```
- **Toggling the isPlaying state in SongPlayer component:**
  - Next, in the SongPlayer component, we want to be able to toggle between the pause and play song button depending on whether a song is currently playing or not
  - We want to consume the SongContext because we want to use the isPlaying state
  - In SongPlayer.js file:
    - Add an onclick event handler that executes the handleTogglePlay method when the PlayArrow icon is clicked
    - Write a handleTogglePlay function that dispatches either an action type of PAUSE_SONG or PLAY_SONG depending on the isPlaying state
    - Then in the render section, write a condition that if isPlaying state is set to true we want to display the `<Pause />` icon. If it's set to false, show the `<PlayArrow />` icon
    ```js
    function handleTogglePlay() {
      dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
    }
    
    <IconButton onClick={handleTogglePlay}>
      {state.isPlaying ? (
        <Pause className={classes.playIcon} />
      ) : (
        <PlayArrow className={classes.playIcon} />
      )}
    </IconButton>
    ```
  - In reducer.js file:
    - Write a switch case for PLAY_SONG action. It returns an object that has the existing state using the spread operator and set the isPlaying state to true  
    ```js
    function songReducer(state, action) {
      switch (action.type) {
        case 'PLAY_SONG': {
          return {
            ...state,
            isPlaying: true
          };
        }
        case 'PAUSE_SONG': {
          return {
            ...state,
            isPlaying: false
          };
        }
        default:
          return state;
      }
    }
    ```
- **Consuming SongContext in Song component:**
  - Lastly we want to sync up the toggle of the Pause/Play button icons of the individual song in SongList component with the song that is in SongPlayer component
  - For example, if the song in SongPlayer is currently playing, the Pause button is visible. This song in the SongList should also be updated with the Pause button visible, indicating that this song is currently playing
  - In SongList.js file:
    - Import SongContext from App.js
    - In Song component:
      - Call useContext() hook and pass in SongContext as an argument to consume SongContext. What we get back from useContext() is the state object and the dispatch function
      - Create a currentSongPlaying state and initialize it to false
      - To update the toggle buttons of a Song component in SongList to be in sync with the toggle buttons in SongPlayer, we can use the useEffect() hook to keep track of state changes in the Song component by its id, the state.song.id, and state.isPlaying
      - Inside useEffect():
        - check to see if state.isPlaying is true AND the song id matches with state.song.id. Assign the result to isSongPlaying variable
        - if the condition above is true, call setCurrentSongPlaying to set isSongPlaying to CurrentSongPlaying state
      - Then in the render section, toggle the Pause/Play button icon based on the currentSongPlaying state
    ```js
    import React, { useContext, useEffect, useState } from 'react';
    import { Pause, PlayArrow, Save } from '@material-ui/icons';
    import { SongContext } from '../App';

    function Song({ song }) {
      const { id } = song;
      const { state, dispatch } = useContext(SongContext);
      const [currentSongPlaying, setCurrentSongPlaying] = useState(false);

      useEffect(() => {
        const isSongPlaying = state.isPlaying && id === state.song.id;
        setCurrentSongPlaying(isSongPlaying);
      }, [id, state.song.id, state.isPlaying]);

      return (
      <IconButton size='small' color='primary'>
        {currentSongPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      );
    }
    ```
- **Syncing Song Component with SongPlayer component:**
  - If the user hits the Play button on a given song in SongList and that song doesn't already exist in SongPlayer, we want to set the song in SongPlayer
  - In SongList.js file and inside Song component:
    - Write a handleTogglePlay function that
      - dispatches either a PAUSE_SONG or a PLAY_SONG action type depending on state.isPlaying state
      - dispatches a SET_SONG action type with the song object payload
    - In the Pause/Play icon button element, add an onClick event handler that executes the handleTogglePlay function
    ```js
    function handleTogglePlay() {
      dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
      dispatch({ type: 'SET_SONG', payload: { song } });
    }

    <IconButton onClick={handleTogglePlay} size='small' color='primary'>
      {currentSongPlaying ? <Pause /> : <PlayArrow />}
    </IconButton>
    ```
  - In reducer.js file:
    - Write a SET_SONG switch case that sets the state.song object with the song object from payload
    ```js
		case 'SET_SONG': {
			return {
				...state,
				// completely replacing the song object with the song from payload
				song: action.payload.song
			};
		}
    ```
  - Now when the Play button is clicked in the Song component, the song data is set in the SongPlayer component. We now can also toggle the Pause/Play button in the Song component and it will update the toggle in the SongPlay component and viscera

### 3. Apollo state management system:
- One downside to working with state management like React reducers is that reducers are pure functions. We can't perform side-effects, we can't interact with the outside world with them. So it's not the best setup when, for example, we want to make an api request
- Apollo comes with a built-in state management system, one that we can setup in our client. We can use this alongside the hooks api such as useQuery(), useMutation(), and useSubscription
- The next feature we want to build is to be able to add a song(component) in song list(component) to the queued song list(component)
- The QueuedSongList isn't going to be stored in the database. Rather, it'll be stored in the browser's localStorage. We want to be able to query and mutate the queued song list by getting, adding, and removing songs
- So we're going to perform queries and mutations locally without making a request to an api
- **Setting up state management on Apollo client:**
  - We need to tell Apollo client about the state we want to manage and we do so with a property on Apollo client called `typeDefs`, short for type definition. And this is something we write with `gql`
  - We need to create a schema to tell Apollo what we're gonna be querying for --the structure of that data and as well as any mutations
  - In client.js file:
    - Create an object type called Song. The structure for this type is exactly the same as we described for SongContext
    - Create an input type called SongInput and define all the fields and its accepted value type
      - An input type is a collection of inputs that can be used to pass to a GraphQL operation
    - Create a Query type object and in here we can define the names of our queries and what we want them to return
      - Our `queue` query is going to return an array of Song type and it's required
    - Create a Mutation type object
      - Define the addOrRemoveFromQueue mutation function which is going to accept SongInput as a parameter and it's going to return an array of Song type
    ```js
    const client = new ApolloClient({
      link: new WebSocketLink({
        uri: 'wss://ngala-music-share.hasura.app/v1/graphql',
        options: {
          reconnect: true
        }
      }),
      cache: new InMemoryCache(),
      typeDefs: gql`
        type Song {
          id: uuid!
          title: String!
          artist: String!
          thumbnail: String!
          duration: Float!
          url: String!
        }

        input SongInput {
          id: uuid!
          title: String!
          artist: String!
          thumbnail: String!
          duration: Float!
          url: String!
        }

        type Query {
          queue: [Song]!
        }

        type Mutation {
          addOrRemoveFromQueue(input: SongInput!): [Song]!
        }
      `
    });
    ```
- **Initializing data on client:**
  - In client.js file:
    ```js
    const data = {
      queue: []
    };

    client.writeQuery({ data });
    ```

### 4. Making queries locally with Apollo client:
- **Writing out a query for client:**
  - We write out a query just like we would write a query for a request made over the network
  - In src/graphql/queries.js file:
    - Write a query called GET_QUEUED_SONGS that performs a query operation that returns the song's field values
    - Add an annotation that tells Apollo that we only want to perform this query on the client
    ```js
    import { gql } from '@apollo/client';

    export const GET_QUEUED_SONGS = gql`
      query getQueuedSongs {
        queue @client {
          id
          duration
          title
          artist
          thumbnail
          url
        }
      }
    `;
    ```
  - In src/graphql/client.js file:
    - Import the GET_QUEUED_SONGS query function
    - Then in the client.writeQuery() method, pass in a `query` property as an argument and set its value to GET_QUEUED_SONGS
    ```js
    // Initialize data
    const data = {
      queue: []
    };

    client.writeQuery({
      query: GET_QUEUED_SONGS,
      data
    });
    ```
- **Executing a local query in React:**
  - In src/components/SongPlayer.js file:
    - Name import the GET_QUEUED_SONGS query
    - Use useQuery() hook to execute the GET_QUEUED_SONGS query
      - What we get back are the data, loading, and error properties, but we only need to destructure the data object
      - The data object contains the queue property, which is an array of queued songs
    - Then pass down the data.queue as queue props to the QueuedSongList child component
    ```js
    import { useQuery } from '@apollo/client';
    import { GET_QUEUED_SONGS } from '../graphql/queries';

    const { data } = useQuery(GET_QUEUED_SONGS);

    <QueuedSongList queue={data.queue} />
    ```
  - In src/components/QueuedSongList.js file:
    - Destructure the queue props received from the SongPlayer parent component
    - For now, console log the `queue` props to see if we've successfully made a query locally (in cache)

### 5. Performing add or remove mutation with resolvers:
- When the Save button is clicked on an individual song in SongList, the song will be added to the QueuedSongList provided that it doesn't already exist in the queued list. If it already does, the Save button, when clicked, will remove the song from the QueuedSongList
- All of this update happens in the browser's localStorage. And we perform the add or remove mutation operation with resolvers
- **Writing out a mutation for client:**
  - In src/graphql/mutations.js file:
    - Write a mutation called ADD_OR_REMOVE_FROM_QUEUE that performs a mutation operation in local database
    ```js
    export const ADD_OR_REMOVE_FROM_QUEUE = gql`
      mutation addOrRemoveFromQueue($input: SongInput!) {
        addOrRemoveFromQueue(input: $input) @client
      }
    `;
    ```
- **Executing a mutation locally in React:**
  - In SongList.js file and inside *Song* component:
    - Import useMutation from @apollo/client
    - Import the ADD_OR_REMOVE_FROM_QUEUE mutation
    - Call the useMutation() hook to execute a mutation and pass in the ADD_OR_REMOVE_FROM_QUEUE mutation as an argument. What we get back is the addOrRemoveFromQueue mutate function
    - We want to perform this operation when the user clicks on the Save button on a song. On the Save button, add an onClick event handler that executes the handleAddOrRemoveFromQueue method
    - Then write a handleAddOrRemoveFromQueue function that executes the addOrRemoveFromQueue mutate function
      - We need to provide the variables object which consists of the input variable. And in this input object we provide the song data and the __typename of Song. We declared the Song type in typeDefs in client.js. Now we're telling Apollo to use this Song type on the song data we provide
    ```js
    import { useMutation, useSubscription } from '@apollo/client';
    import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

    function Song({ song }) {
      const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);
      
      function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
          variables: { input: { ...song, __typename: 'Song' } }
        });
      }
    }
    ```
- **Creating functionality of mutation function with resolvers:**
  - Now that we've collected the data in the input variable we want to perform the add or remove mutation operation with that data to our local database
  - We do this with resolvers. It determines how different queries and mutations are resolved - resolved to a value
  - In src/graphql/client.js file:
    - Inside the new client configuration object, add a resolvers property
    - And on this resolvers object, create a Mutation object that corresponds to the type Mutation we extend
    - And on this Mutation object is going to have the addOrRemoveFromQueue function that's going to resolve the incoming input data into an array of songs with the appropriate values
    - The addOrRemoveFromQueue function receives 3 parameters. The 1st we can ignore, the 2nd are the arguments provided to the mutation function, the 3rd is the cache object
    - Currently our queue array in the database is empty. We update the cache to add a song to the queue array
    - To update data in the cache, we first need to read from it by calling the `cache.readQuery()` method. This method performs a GET_QUEUED_SONGS query operation. What we should get back from the query is an array of songs (queue array). Save the result in queryResult variable
    - Then check to see if the song we're trying to save (clicking on the Save button) to the queue list is already in the queue. If it does, we want to remove the song from the queue list by its id. If it doesn't, then add the song to the queue list
    - Lastly, call the `cache.writeQuery()` method to update/manage the data in cache. We're updating the queue array with the newQueue song. Note that the `cache.writeQuery()` method requires that we provide the `data` property to update the data and that we first need to query the data that we want to update
    - The addOrRemoveFromQueue mutation function is expecting a return an array of songs
    - When we first readQuery the cache and if there's nothing in there, we return an empty array. We only return a newQueue array if there was a result when we read the query
    ```js
    typeDefs: gql`
      type Mutation {
        addOrRemoveFromQueue(input: SongInput!): [Song]!
      }
    `,
    resolvers: {
      Mutation: {
        addOrRemoveFromQueue: (_, { input }, { cache }) => {
          const queryResult = cache.readQuery({
            query: GET_QUEUED_SONGS
          });
          if (queryResult) {
            // destructure the queue property on data object
            const { queue } = queryResult;
            const isInQueue = queue.some((song) => song.id === input.id);
            // newQueue contains the updated queue array
            const newQueue = isInQueue
              ? queue.filter((song) => song.id !== input.id)
              : [...queue, input];
            cache.writeQuery({
              query: GET_QUEUED_SONGS,
              data: { queue: newQueue }
            });
            return newQueue;
          }
          // return an empty array if there's no queryResult
          return [];
        }
      }
    }
    ```
- **Displaying queued song data in cache on QueuedSongList component:**
  - Now we want to display the songs in queued list (queue array) stored in local database cache on QueuedSongList component
  - In src/components/QueuedSongList.js file:
    ```js
    function QueuedSongList({ queue }) {
      console.log({ queue });
      
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
    ```
- **Implementing delete queued song with Delete button:**
  - In src/components/QueuedSongList.js file and in QueuedSong component:
    - Import useMutation hook from @apollo/client
    - Import the ADD_OR_REMOVE_FROM_QUEUE mutation
    - In the Delete icon button, add an onClick event handler that executes the handleAddOrRemoveFromQueue function
    - Copy and paste the handleAddOrRemoveFromQueue function we use in SongList component. This function executes the addOrRemoveFromQueue mutation function
    ```js
    import { useMutation } from '@apollo/client';
    import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

    function QueuedSong({ song }) {
      const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);

      function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
          // spread in all of the song data
          variables: { input: { ...song, __typename: 'Song' } }
        });
      }

      return (
        <IconButton onClick={handleAddOrRemoveFromQueue}>
          <Delete color='error' />
        </IconButton>
      )
    }
    ```

### 6. Persisting data in browser's localStorage:
- Next we want the data we store in the browser's localStorage to persist when we refresh the page or when the page reloads. Also, when our app loads for the first time, we want fetch the queued song list (array of songs) from the localStorage and display it in QueuedSonglist
- We use the getItem and setItem methods on localStorage object to set and fetch data from localStorage. We store the data by the key name and we retrieve data by the same key name
- In SongList.js file and the Song component:
  - When we use the useMutation() hook, we can pass a 2nd argument to it and have access to the `onCompleted` callback. The benefit of this is in the parameter of the callback we get access to the data object from the executed mutation
  - The executed ADD_OR_REMOVE_FROM_QUEUE mutation returns an array of songs on data object
  - So in the callback, we can call the .setItem() method on localStorage to set the array of songs in localStorage by the key name 'queue'
  - Another thing to note is localStorage only accepts string values and our songs is in Javascript array object. So we need to call the JSON.stringify() method to convert the array into a string
  ```js
	const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
		onCompleted: (data) => {
			localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue));
		}
	});
  ```
- We also want to persist changes in localStorage when we delete a song from the queued list
- In QueuedSongList.js file and in QueuedSong component, copy and paste the `onCompleted` callback we use in the Song component to the useMutation() hook as a 2nd argument
- The last thing we need to do is when we write the data using client.writeQuery() to cache, we want to use the data saved in localStorage with the key of queue, if there is data there
- In src/graphql/client.js file:
  - Write a condition that check to see if there is data in localStorage with the key of queue. It should return a boolean of true or false
  - Then in our data object, use a ternary operator to see if queue localStorage has data in it. If it does, call getItem() method on localStorage to the the data and parse it to Javascript array. Then set it to the queue(array) property on data object. If there's no data exists in queue localStorage, set the queue property to an empty array
  ```js
  const hasQueue = Boolean(localStorage.getItem('queue'));

  // Initialize data
  const data = {
    queue: hasQueue ? JSON.parse(localStorage.getItem('queue')) : []
  };
  ```


## PLAYING SONGS

### 1. Playing the song in SongPlayer component:
- **Implementing the play song functionality:**
  - We want to actually play the song that is loaded in SongPlayer when we hit the Play button
  - In src/components/SongPlayer.js file:
    - Import the ReactPlayer component from react-player
    - Render the ReactPlayer component somewhere at the bottom of the page
      - Set it to be hidden
      - Pass in the url props and set it to state.song.url
      - Pass in the playing props and set it to state.isPlaying
    ```js
    import ReactPlayer from 'react-player';

    <ReactPlayer url={state.song.url} playing={state.isPlaying} hidden />
    ```
  - The song should now play when we hit the Play button

### 2. Adjusting and moving the position of song slider:
- **Showing song progress with the song slider:**
  - The ReactPlayer component has an `onProgress` callback that we can use to show the song progress
  - The callback gives us 2 values: played and playedSeconds
    - The played property will give us a value from 0 to 1. We've set the min/max values from 0 to 1 in the `<Slider />` component
    - We're going to use the `played` value to move our slider along as the song is playing
  - So we need to create a played state and initialize it to 0
  - In the onProgress callback, call setPlayed method and pass in played as an argument. This will store the played value in played state
  - We want the Slider component to be controlled by the played state. Set the value property to played state
    ```js
    const [played, setPlayed] = useState(0);

    <Slider value={played} type='range' min={0} max={1} step={0.01} />

    <ReactPlayer
      onProgress={({ played, playedSeconds }) => {
        setPlayed(played);
      }}
      url={state.song.url}
      playing={state.isPlaying}
      hidden
    />
    ```
  - Now when we're playing the song the slider progress moves to the played value that is stored in played state. The slider is controlled by the played state
- **Seeking with slider position:**
  - Next we want to be able to move and adjust the slider to any position we want to play the song
  - On the Slider component, add an onChange event handler that executes the handleProgressChange method
  - Write a handleProgressChange function that sets played state to the newValue
  - We need to create another piece of state called seeking when the user moves the slider. Initialize it to false
  - On the Slider component, add an onMouseDown event handler that executes the handleSeekMouseDown method
  - Write a handleSeekMouseDown function that sets the seeking state to true
  - Then on the Slider component, add an onMouseUp event handler that executes the handleSeekMouseUp method
  - Create a reactPlayerRef using useRef() hook
  - In the ReactPlayer component, set the `ref` property to reactPlayerRef
  - Write a handleSeekMouseUp function that
    - sets seeking state back to false
    - and sets the current value of reactPlayerRef to played value that's stored in played state
  - Lastly, in the onProgress callback, we only want to set the played value coming from the callback to played state if seeking state is false. In other words, we don't want to set played state while the user is moving the slider
  ```js
  import React, { useRef, useState } from 'react';

  function SongPlayer() {
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const reactPlayerRef = useRef();

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
    )
  }
  ```

### 3. Displaying the song playing in playedSeconds:
- While the song is playing we want to display the progress of the song in digit form - in hours, minutes, and seconds
- In src/components/SongPlayer.js file:
  - The second destructured value that we're getting from `onProgress` callback is what's going to be used for
  - Create a piece of state called playedSeconds and initialize its value to 0
  - In `onProgress` callback, set the playedSeconds value to playedSeconds state
  - Then at where we used to display the hard-coded value for song duration, we can interpolate the playedSeconds state here. However, the value being displayed is not user-friendly to read. We can format the value into 00:00:00 format instead
  - Write a formatDuration function that formats the playedSeconds value
  ```js
  const [playedSeconds, setPlayedSeconds] = useState(0);

	function formatDuration(seconds) {
		return new Date(seconds * 1000).toISOString().substr(11, 8);
  }
  
  <Typography variant='subtitle1' component='p' color='textSecondary'>
    {formatDuration(playedSeconds)}
  </Typography>

  <ReactPlayer
    ref={reactPlayerRef}
    onProgress={({ played, playedSeconds }) => {
      if (!seeking) {
        setPlayed(played);
        setPlayedSeconds(playedSeconds);
      }
    }}
    url={state.song.url}
    playing={state.isPlaying}
    hidden
  />
  ```




## NPM PACKAGES USED
- material-ui and material-ui icons: `npm i @material-ui/core @material-ui/icons`
- apollo-client and graphql: `npm install @apollo/client graphql`
- react-player: `npm i react-player`
  - docs: https://www.npmjs.com/package/react-player
- apollo websocket, subscriptions, and cache: `npm i @apollo/client  subscriptions-transport-ws`