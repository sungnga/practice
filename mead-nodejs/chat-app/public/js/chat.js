const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

// Listen for 'message' event
socket.on('message', (message) => {
    console.log(message)
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