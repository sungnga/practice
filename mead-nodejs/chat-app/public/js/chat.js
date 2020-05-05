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
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
// Qs library(cloudflare) will parse the query string provided by the user
// location.search is the query string
// What's returned from Qs.parse() is an object with key/value pair
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

// Autoscroll function
const autoscroll = () => {
    // Alternatively, if you're viewing message history and a new message comes in and the autoscroll always takes you to the bottom where the latest/new message is, then just run this one-line code
    // $messages.scrollTop = $messages.scrollHeight

    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visable height
    const visableHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight
    
    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visableHeight

    // If the user scrolls up to view message history and a new message comes in, it won't autoscroll to the latest incoming message
    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

// Listen for 'message' event
// 'message' inside the callback we get back from the server is an object
// Use message.text to extract the text property off of message object
socket.on('message', (message) => {
    console.log(message)
    // Render the message
    // To render the data dynamically, provide the data as a 2nd arg to .render() method
    // Here, we pass in the data into the template. Mustache will render it
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    // Add the html to the messages list
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

// Listen for 'locationMessage' event
socket.on('locationMessage', (message) => {
    console.log(message)
    // Render the location template with the data provided
    const html = Mustache.render(locationTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    // Where to display the rendered html
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

// Listen for 'roomData' event
socket.on('roomData', ({ room, users }) => {
    // Render the sidebar template with the data
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    // A place to display the rendered data
    document.querySelector('#sidebar').innerHTML = html
})

// Send a message
// Emit a 'sendMessage' event
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
// Emit a 'sendLocation' event
// The data provided is the latitude and longitude of the location
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

// Emit a 'join' event
// The data provided is an object with the username and room name
// 3rd arg: a callback function where the server can send back acknowledgement to the user
// If error, meaning that the user weren't able to join the chat room
//  - send an alert with the error message
//  - redirect user to the home screen
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
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
//
// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked')
//     // Sending data back to the server
//     // Create the name of the event
//     socket.emit('increment')
// })