const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '4510e0c9',
            s: searchTerm
        }
    });

    //handling an errored response
    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
};

//creating the autocomplete widget
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

//apply debounce function by passing as arg to onInput function
//the callback function inside this debounce() will be received into debounce() as FUNC
//lastly, the returned function from debounce() will be assigned to onInput() function
const onInput = debounce(async event => {
    //call fetchData with the value from the input element
    //fetchData() returns the data from api. Assign this data to variable movies
    //NOTE: remember that fetchData() is an async function. It takes sometime for the data to return. Therefore need to mark the fetchdata() here with keyword 'await' and onInput() function with 'async'. Else it will return the promise, not the data
    const movies = await fetchData(event.target.value);
    console.log(movies)

    //if no movies is returned, close the dropdown and exit the function
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    //clear out the list of results before fetching new query
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    //loop thru the movies array, create a new div element and pass in details of each movie(array item) into it
    for (let movie of movies) {
        const option = document.createElement('a');
        //check to see if the value of image source is N/A
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        option.classList.add('dropdown-item')
        //add content to the new anchor tag
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
        `;

        //listen for a click event if the user clicks on an item in the menu option
        //Update the input value to the movie title being clicked on. Then collapse the dropdown menu
        //do a followup request to get detailed info of the selected movie
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        })
        //append the new option/anchor tag(as a child) inside the div with class results
        resultsWrapper.appendChild(option);
    }
}, 1000);

//the input event is triggered when the user changes the text inside that input element
input.addEventListener('input', onInput)

//check to see if the user clicks on anywhere other than the elements contain in root. If true, close the dropdown menu
document.addEventListener('click', event => {
    //if the element being clicked on is not contained inside the root(the autocomplete element), set dropdown menu as not active
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});

//make this an async function
//get detailed info about a particular movie
const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '4510e0c9',
            //search by id and pass in the imdbID property of the movie
            i: movie.imdbID
        }
    });
    console.log(response.data);
    //select the div tag with id summary. Add the content using innerHTML. That content comes from calling the helper function movieTemplate() where the data of the movie is passed in as arg
    document.querySelector('#summary').innerHTML = movieTemplate(response.data)
};

//a helper function that displays details of a movie
const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"></img>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Award}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;    
}


// ******************************
// Issues with Implementation
// ******************************
// All code touches everything
// Autocomplete widget was supposed to be reusable!
// Autocomplete has knowledge of what a movie object is
// Autocomplete has knowledge of what to shwo for each option
// Autocomplete has knowledge of what to do when a movie is clicked
// Many global variables that refer to specific elements - it will be really hard to show a second autocomplete on the screen