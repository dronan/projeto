const { profiles } = require('../data/db')

module.exports = {
    // Convert an hipotetic field with a wrong name to a correct name
    // salary comes from the database as real_salary and it's converted to salary, that is used by graphql
    salary(user) {
        return user.real_salary
    },
    profile(user) {
        const selected = profiles.filter(p => p.id == user.profile_id)
        return selected ? selected[0] : null
    }
}