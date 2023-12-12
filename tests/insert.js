const db = require('../config/db')

// const newProfile = {
//     name: 'visitor',
//     label: 'Visitor'
// }

// db('profiles')
//     .insert(newProfile)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .finally(() => db.destroy())

const newProfile = {
    name: 'root '+ Math.random(),
    label: 'Super User'
}

db('profiles')
    .insert(newProfile)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => db.destroy())