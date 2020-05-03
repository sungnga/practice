const socket = io()

// To receive an event that the server sends
// Make sure the name of the event matches with the name you created the event
// We have access to the data sent by the server in the callback function
socket.on('countUpdated', (count) => {
    console.log('The count has been updated', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('clicked')
    // Sending data back to the server
    // Create the name of the event
    socket.emit('increment')
})