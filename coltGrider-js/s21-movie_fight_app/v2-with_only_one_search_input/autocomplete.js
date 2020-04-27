const createAutocomplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
    //specify where to render the autocomplete to
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;
    //look for these elements inside root instead of the document
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    
    //apply debounce function by passing as arg to onInput function
    //the callback function inside this debounce() will be received into debounce() as FUNC
    //lastly, the returned function from debounce() will be assigned to onInput() function
    const onInput = debounce(async event => {
        //call fetchData with the value from the input element
        //fetchData() returns the data from api. Assign this data to variable movies
        //NOTE: remember that fetchData() is an async function. It takes sometime for the data to return. Therefore need to mark the fetchdata() here with keyword 'await' and onInput() function with 'async'. Else it will return the promise, not the data
        const items = await fetchData(event.target.value);
        console.log(items)
    
        //if no movies is returned, close the dropdown and exit the function
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }
    
        //clear out the list of results before fetching new query
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        //loop thru the movies array, create a new div element and pass in details of each movie(array item) into it
        for (let item of items) {
            const option = document.createElement('a');
            
            option.classList.add('dropdown-item')
            //add content to the new anchor tag. The content comes from calling the renderOption() function
            option.innerHTML = renderOption(item);
    
            //listen for a click event if the user clicks on an item in the menu option
            //Update the input value to the movie title being clicked on. Then collapse the dropdown menu
            //do a followup request to get detailed info of the selected movie
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
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
    

}