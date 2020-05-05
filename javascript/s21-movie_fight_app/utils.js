//debounce helper function
//takes in a function and returns a newer version of the function
//this helper function calls setTimeout() on a function being passed in
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        //check if timeoutId exists
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        //wait for a certain amount of time before invoking func()
        timeoutId = setTimeout(() => {
            //like calling func(arg1, arg2, arg3...) but using apply()
            func.apply(null, args);
        }, delay)
    };
};
