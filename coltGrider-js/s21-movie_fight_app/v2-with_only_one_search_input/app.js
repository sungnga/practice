//create an autocomplete widget by calling the createAutocomplete() function
//pass in the necessary parameters as an object
createAutocomplete({
    ////specify where to render the autocomplete to
    //target the div element with class autocomplete
    root: document.querySelector('.autocomplete'),
    //how to show an individual item
    renderOption(movie) {
        //check to see if the value of image source is N/A
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `;
    },
    //what to do when someone clicks on one
    onOptionSelect(movie) {
        onMovieSelect(movie)
    },
    //what to backfill when the user clicks on one
    inputValue(movie) {
        return movie.Title
    },
    //how to fetch the data
    async fetchData(searchTerm) {
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
    }
})

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
