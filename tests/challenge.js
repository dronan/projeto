const db = require('../config/db')

async function saveUser(name, email, password) {
    let user = await db('users')
        .where({ email }).first()

    if (!user) {
        const [inserted] = await db('users')
            .insert({ name, email, password })
            .returning('id'); 
        const id = inserted.id; 
        user = await db('users').where({ id }).first()
    } else {
        await db('users')
            .where({ id: user.id })
            .update({ name, email, password })
        user = { ...user, name, email, password }
    }

    return user
}

async function saveProfile(name, label) {
    let profile = await db('profiles')
        .where({ name }).first()

    if (!profile) {
        const [inserted] = await db('profiles')
            .insert({ name, label })
            .returning('id'); 
        const id = inserted.id; 
        profile = await db('profiles').where({ id }).first()
    } else {
        await db('profiles')
            .where({ id: profile.id })
            .update({ name, label })
        profile = { ...profile, name, label }
    }

    return profile
}

async function addUsersProfiles(user, ...profiles) {
    const user_id = user.id
    await db('users_profiles')
        .where({ user_id })
        .delete()

    for(profile of profiles) {
        const profile_id = profile.id
        await db('users_profiles')
            .insert({ user_id, profile_id })
    }
}

async function executar() {
    const user = await saveUser('pauxlo', 'pausdslo@lo.com', 'aa')
    const profileA = await saveProfile('hr', 'Human Resources')
    const profileB = await saveProfile('fin', 'Financial')

    await addUsersProfiles(user, profileA, profileB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())
