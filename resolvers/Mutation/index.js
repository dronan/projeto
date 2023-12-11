const user = require('./usuario')
const profile = require('./profile')

module.exports = {
    ...user,
    ...profile
}
