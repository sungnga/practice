// Keeping track of our users in an array
const users = []

// Four functions: addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id, username, room}) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    // .find() method returns the item in the array
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    // .findIndex() method returns the position of the array item
    // .findIndex() stops searching once a match is found
    // index is a number. index is -1 if we didn't have a match. index is 0 if there's a match
    const index = users.findIndex((user) => {
        return user.id === id
    })

    // If there's a match
    if (index !== -1) {
        // .splice() method removes items from the users array by their index
        // 1st arg: the item at this particular index
        // 2nd arg: how many items you want to remove
        // [0] means accessing the item at first index of the array
        // return this particular user
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id
    })
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => {
        return user.room === room
    })
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}





// addUser({
//     id: 33,
//     username: 'nga',
//     room: '   seattle'
// })

// addUser({
//     id: 33,
//     username: 'andrew',
//     room: '   seattle'
// })

// addUser({
//     id: 35,
//     username: 'nga',
//     room: 'portland'
// })

// const foundUser = getUser(33) 
// console.log(foundUser)

// const roomUsers = getUsersInRoom('portland')
// console.log(roomUsers)

// const res = addUser({
//     id: 11,
//     username: 'Nga',
//     room: 'portland'
// })
// console.log(res)

// const removedUser = removeUser(11)
// console.log(removedUser)

// console.log(users)


// GOAL: Create two new functions for users
// 1. create getUser
//  - accept id and return uer object (or undefined)
// 2. create getUsersInRoom
//  - accept room name and return array of users (or empty array)
