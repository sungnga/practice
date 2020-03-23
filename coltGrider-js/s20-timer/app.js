class Timer {
    // receive args(DOM elements) inside the constructor
    constructor(durationInput, startButton, pauseButton) {
        //Take the arg and assign them to instance variables inside the class. This stores a reference of each args so other methods can refer to these DOM elements
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        //bind a click event to startButton element. run start method when it's clicked
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    //define start method using arrow function, because we want the value of 'this' inside start() to be instance of Timer class 
    start = () => {
        //when start() is called, tick() is called immediately
        this.tick();
        //then setInterval() kicks in.
        //intervalId contains the value of setInterval id. In order to share information of timer variable, we assign the variable to instance variable with the keyword this. Now other methods can use this variable
        this.intervalId = setInterval(this.tick, 1000);
    }

    pause = () => {
        //using intervalId variable that was defined in another method
        clearInterval(this.intervalId);

    }

    tick = () => {
        //if time hits 0, stop the time interval
        if (this.timeRemaining <= 0) {
            this.pause()
        } else {
        //get time from getter() and update it
        //NOTE: this.timeRemaining is an instance variable
        this.timeRemaining = this.timeRemaining - 1;
        }

        // **************************
        // old way of get and set time
        // **************************
        // //get the string value of durationInput element and convert to a number
        // const timeRemaining = parseFloat(this.durationInput.value);
        // //updating the durationInput element
        // this.durationInput.value = timeRemaining - 1;
    }

    //NOTE: with getter method, just use the instance variable(timeRemaining) to invoke the method
    get timeRemaining() {
        return parseFloat(this.durationInput.value)
    }

    //arg time is equal to timeRemaining-1
    set timeRemaining(time) {
        this.durationInput.value = time;
    }
}

//select the elements from the DOM
const durationInput = document.querySelector('#duration')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')

//create new instance of Timer class and pass in the three elements
const timer = new Timer(durationInput, startButton, pauseButton)
