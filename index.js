const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./DB/schema');
const resolvers = require('./DB/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

//server
//conectarDB()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) =>{
        const  myContext = "Hola";
        console.log(req.headers["authorization"])
        const token = req.headers["authorization"] || ""
        if(token){
            try {
                const usuario = jwt.verify(token, process.env.SECRETA)
                return {
                    usuario
                } 
            } catch (error) {
                console.log(error)
            }
        }
    }
});

//arrancar server
server.listen().then(({ url }) => {
    console.log(`SERVIDOR CORRIENDO EN URL: ${url}`)
})