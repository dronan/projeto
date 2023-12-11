const { profiles, nextId } = require('../../data/db')

function filterProfile(filter) {
    if (!filter) return -1
    const { id } = filter
    if (id)
        return profiles.findIndex(u => u.id === id)
    
    return -1
}

module.exports = {
    newProfile(_, { data }) {

        const existentName = profiles.some(u => u.name === data.name)

        if (existentName) {
            throw new Error('Profile already registered')
        }

        const profile = {
            id: nextId(),
            ...data,
            profile_id: 1,
            status: 'ACTIVE'
        }

        profiles.push(profile)
        return profile
    },
    deleteProfile(_, { filter }) {
        const i = filterProfile(filter)
        if (i < 0) return null
        const excluded = profiles.splice(i, 1)
        return excluded ? excluded[0] : null
    },
    updateProfile(_, { filter, data }) {
        const i = filterProfile(filter)
        if (i < 0) return null

        const profile = {
            ...profiles[i],
            ...data
        }

        profiles.splice(i, 1, profile)
        return profile
    }

}