const { ApolloServer } = require('apollo-server')
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const context = require('./context')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.listen(5000, () => {
    console.log('server listening on 5000');
})
