const db = require('../config/db')

db('users')
    // .whereIn('id', [10, 11, 12, 13, 14])
    .delete()
    .then(resp => console.log(resp))
    .finally(() => db.destroy())