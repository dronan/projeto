const users = [
    {
        id: 1,
        name: "João Silva",
        email: "joao@gmail.com",
        age: 29,
        profile_id: 1,
        status: "ACTIVE",
    },
    {
        id: 2,
        name: "Rafael Junior",
        email: "rafael@gmail.com",
        age: 31,
        profile_id: 2,
        status: "INACTIVE",
    },
    {
        id: 3,
        name: "Daniela Smith",
        email: "daniela@gmail.com",
        age: 24,
        profile_id: 1,
        status: "BLOCKED",
    }
]

const profiles = [
    {
        id: 1,
        name: "Admin"
    },
    {
        id: 2,
        name: "Common"
    }
]

module.exports = { users, profiles }