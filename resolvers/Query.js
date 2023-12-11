const { users, profiles } = require('../data/db')

module.exports = {
    hello() {
        return "ola"
    },
    actualTime() {
        return `${new Date()}`
    },
    loggedUser() {
        return {
            id: 1,
            name: "Logged User Name",
            email: "logged@user.com",
            age: 23,
            real_salary: 1234.56,
            vip: true
        }
    },
    highlightProduct() {
        return {
            name: "Notebook",
            price: 10000.00,
            discount: 0.50
        }
    },
    numbers() {
        const asc = ( a, b ) => a - b
        let numeros = new Set();
        while (numeros.size < 6) {
            numeros.add(parseInt(Math.random() * 60 + 1));
        }
        return Array.from(numeros).sort(asc);
    },
    users() {
        return users
    },
    user(_, { id } ) {
        const selected = users.filter(u => u.id == id)
        return selected ? selected[0] : null
    },
    profiles() {
        return profiles
    },
    profile(_, { id }) {
        const selected = profiles.filter(p => p.id == id)
        return selected ? selected[0] : null
    },
}