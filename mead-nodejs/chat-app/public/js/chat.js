const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
// Where we want to render the message
const $messages = document.querySelector('#messages')

// Templates
// Calling .innerHTML will get the elements inside the script tag
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

// Listen for 'message' event
socket.on('message', (message) => {
    console.log(message)
    // Render the message
    // To render the data dynamically, provide the data as a 2nd arg to .render() method
    // Here, we pass in the data into the template. Mustache will render it
    const html = Mustache.render(messageTemplate, {
        message
    })
    // Add the html to the messages list
    $messages.insertAdjacentHTML('beforeend', html)
})

// Send a message
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Disable the form button once it's submitted
    $messageFormButton.setAttribute('disabled', 'disabled')

    // The value of the form input
    const message = $messageFormInput.value

    // Emit 'sendMessage' event to the server
    socket.emit('sendMessage', message, (error) => {
        // Enable the form button again
        $messageFormButton.removeAttribute('disabled')
        // Clear the form input 
        $messageFormInput.value = ''
        $messageFormInput.focus()

        // If the server sends back an error from the callback
        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })
})

// Share your location
$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolation is not supported')
    }
    
    // Disable the send location button after it is sent
    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        socket.emit('sendLocation', latitude, longitude, () => {
            // Enable the location button again
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})

socket.on('locationMessage', (url) => {
    console.log(url)
    // Render the location url
    const html = Mustache.render(locationTemplate, { url })
    // Add the html to the messages list
    $messages.insertAdjacentHTML('beforeend', html)
})




// =====================
// NOTES
// =====================

// // To receive an event from the server:
// // Make sure the name of the event matches with the name you created the event
// // We have access to the data sent by the server in the callback function
// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked')
//     // Sending data back to the server
//     // Create the name of the event
//     socket.emit('increment')
// })