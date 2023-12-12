const db = require('../config/db')

db('profiles')
    // .where({ id: 2 })
    // .where('id', '=', 2)
    // .where('name', 'like', '%root%')
    .whereIn('id', [1, 2, 3])
    .then(resp => console.log(resp) )
    .finally(() => db.destroy())
