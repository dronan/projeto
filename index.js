const { ApolloServer, gql } = require('apollo-server');

const users = [
    {
        id: 1,
        name: "João Silva",
        email: "joao@gmail.com",
        age: 29,
        profile_id: 1,
    },
    {
        id: 2,
        name: "Rafael Junior",
        email: "rafael@gmail.com",
        age: 31,
        profile_id: 2,
    },
    {
        id: 3,
        name: "Daniela Smith",
        email: "daniela@gmail.com",
        age: 24,
        profile_id: 1,
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



const typeDefs = gql`
    scalar Date
    
    type Profile {
        id: Int
        name: String
    }

    type Product {
        name: String!
        price: Float!
        discount: Float
        priceWithDiscount: Float
    }

    type User {
        id: Int
        name: String!
        email: String!
        age: Int
        salary: Float
        vip: Boolean
        profile: Profile
    }

    type Query {
        hello: String
        actualTime: Date
        loggedUser: User
        highlightProduct: Product
        numbers: [Int!]!
        users: [User]
        user(id: Int): User
        profiles: [Profile]
        profile(id: Int): Profile
    }
`;

const resolvers = {

    User: {
        // Convert an hipotetic field with a wrong name to a correct name
        // salary comes from the database as real_salary and it's converted to salary, that is used by graphql
        salary(user) {
            return user.real_salary
        },
        profile(user) {
            const selected = profiles.filter(p => p.id == user.profile_id)
            return selected ? selected[0] : null
        }
    },
    Product: {
        priceWithDiscount(product) {
            if (!product.discount) return product.price
            return product.price * (1 - product.discount)
        }
    },
    Query: {
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
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});