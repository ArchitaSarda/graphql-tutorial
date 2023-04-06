const users = [
    {
        name: 'abc',
        age: 4,
        id: 1
    },
    {
        name: 'def',
        age: 5,
        id: 2
    },
    {
        name: 'xyz',
        age: 5,
        id: 3
    }
]

let msgData = []

let personData = []

const resource = [
    {
        name: 'abc',
        id: 1,
        status: 'available'
    },
    {
        name: 'def',
        id: 2,
        status: 'available'
    },
    {
        name: 'xyz',
        id: 3,
        status: 'not_available'
    }
]

module.exports = {users, msgData, personData, resource}