const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date
    
    type Product {
        name: String!
        price: Float!
        discount: Float
        priceWithDiscount: Float
    }

    type User {
        id: ID
        name: String!
        email: String!
        age: Int
        salary: Float
        vip: Boolean
    }

    type Query {
        hello: String
        actualTime: Date
        loggedUser: User
        highlightProduct: Product
    }
`;

const resolvers = {

    User: {
        // Convert an hipotetic field with a wrong name to a correct name
        // salary comes from the database as real_salary and it's converted to salary, that is used by graphql
        salary(user) {
            return user.real_salary
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
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});