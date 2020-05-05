//separate out any reusable functions & properties that are not unique when the createAutoComplete() is called
const autoCompleteConfig = {
    //how to show an individual item
    renderOption(movie) {
        //check to see if the value of image source is N/A
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `;
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
}

//this function creates an autocomplete widget
//pass in the necessary parameters as an object
createAutocomplete({
    //Spread operation of autoCompleteConfig object
    ...autoCompleteConfig,
    //specify where to render the autocomplete to
    //target the div element with left-autocomplete id
    //add in any properties that is unique pertaining to this particular functionality. Add in this root property
    root: document.querySelector('#left-autocomplete'),
    //what to do when someone clicks on one
    onOptionSelect(movie) {
        //when a user clicks on an item, hide the tutorial
        document.querySelector('.tutorial').classList.add('is-hidden');
        //pass in a second arg to where you want the summary to show
        //3rd arg the movie will display on the left side
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    }
})

//create a second search input
createAutocomplete({
    //Spread operation of autoCompleteConfig object
    ...autoCompleteConfig,
    //specify where to render the autocomplete to
    //target the div element with id right-autocomplete
    //add in this root property
    root: document.querySelector('#right-autocomplete'),
    //what to do when someone clicks on one
    onOptionSelect(movie) {
        //when a user clicks on an item, hide the tutorial
        document.querySelector('.tutorial').classList.add('is-hidden');
        //pass in a second arg to where you want the summary to show
        //3rd arg the movie will display on the right side
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    },
})

let leftMovie;
let rightMovie;
//make this an async function
//get detailed info about a particular movie
//2nd arg is the DOM element where the movie summary will go
//3rd arg indicates which side of the movie will go
const onMovieSelect = async (movie, summaryElement, side) => {
    //save the promise value to response
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '4510e0c9',
            //search by id and pass in the imdbID property of the movie
            i: movie.imdbID
        }
    });
    console.log(response.data);
    //select the element(referenced as summaryElement). Add the content using innerHTML. That content comes from calling the helper function movieTemplate() where the data of the movie is passed in as arg
    summaryElement.innerHTML = movieTemplate(response.data)
    //check to see if it's the left or right side
    //set the movie data to the corresponding variable
    if (side === 'left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }
    //check leftMovie and rightMovie are defined. If true, run the runcomparison() function
    if (leftMovie && rightMovie) {
        runComparison();
    }
};

//NOTE: this function is executed inside the onMovieSelect() function
const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    //iterate thru the list of articles in leftSideStas. leftStat represents each article that has the data-value
    //index is to retrieve the index of the list
    leftSideStats.forEach((leftStat, index) => {
        //set the right side stats to the corresponding index of the left side stats and assign each one to rightStat
        const rightStat = rightSideStats[index];
        console.log(leftStat, rightStat);
        //to get the value from the data-value attribute in each article. Also convert from string to number
        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);
        if (rightSideValue > leftSideValue) {
            //in Bulma css, class is-primary has green background color
            leftStat.classList.remove('is-primary');
            //class is-warning has yellow background color
            leftStat.classList.add('is-warning')
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    })
};

//a helper function that displays details of a movie
//NOTE: this function is exectuted inside the onSelectMovie() function, where the returned value is an html elements added into the summaryElement element
const movieTemplate = (movieDetail) => {
    //retrieve the dollar amount and turn it into an integer and remove the $ symble and commas
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    //split() will return an array
    //reduce() will iterate thru the array and returns a single total value at the end. Initial prev value is set to 0
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);
        //check to see if the value is not a number (NaN). If true, return the prev value
        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
    }, 0)

    console.log(awards)

    //html element with movie details
    //data-value attribute in each article contains the dataset for the properties
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
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;    
}
