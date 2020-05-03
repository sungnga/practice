
const socket = io()

// Listen for 'message' event
socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    // The value of the form input
    const clientMessage = e.target.elements.message.value

    // Emit 'sendMessage' event to the server
    // clientMessage gets passed to the callback function on the server side
    socket.emit('sendMessage', clientMessage)
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