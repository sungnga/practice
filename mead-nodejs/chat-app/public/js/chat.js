
const socket = io()

// Listen for 'message' event
socket.on('message', (message) => {
    console.log(message)
})

// Send a message
document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    // The value of the form input
    const clientMessage = e.target.elements.message.value

    // Emit 'sendMessage' event to the server
    // clientMessage gets passed to the callback function on the server side
    socket.emit('sendMessage', clientMessage, (error) => {
        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })
})

// Share your location
document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolation is not supported')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        socket.emit('sendLocation', latitude, longitude, () => {
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