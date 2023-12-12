const db = require('../config/db')


const newUser = {
    name: 'Test',
    password: 'resetpassword'
}

async function updateUser(filter, data) {

    //count
    const qtde = await db('users').count('* as qtde').first()
    console.log(qtde)

    if(qtde === 0) {
        await db('users').insert(newUser)
    }

    //consult
    let { id } = await db('users').select('id').limit(1).first()
    console.log(id)

    //change
    await db('users').where(filter).update(newUser)

    return db('users').where(filter)

}

updateUser({ id: 3 }, newUser)
        .then(res => console.log(res))
        .finally(() => db.destroy())