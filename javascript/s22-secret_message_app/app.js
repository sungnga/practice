//destructure hash property from window.location object
const { hash } = window.location;

//atob() function converts the value of the hash property to ascii characters
const message = atob(hash.replace('#', ''));

if (message) {
    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#message-show').classList.remove('hide');

    //set the message inside the h1 element
    document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', event => {
    //prevents the browser to automatic submit the form to some backend server
    event.preventDefault();

    //toggle visability when user clicks submit
    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#link-form').classList.remove('hide');
    

    //to select input element with id message-input
    const input = document.querySelector('#message-input');
    //the btoa() function takes the input value and converts it into ascii code representation and then encrypted it into base64 code representation
    const encrypted = btoa(input.value);

    const linkInput = document.querySelector('#link-input');
    linkInput.value = `${window.location}#${encrypted}`;
    //have the link automatically selected
    linkInput.select();
})