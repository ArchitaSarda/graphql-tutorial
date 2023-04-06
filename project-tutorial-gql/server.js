var { graphql, buildSchema } = require('graphql');
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const app = express();

const {users, msgData, personData, resource} = require('./data');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  enum STATUS {
    available
    not_available
  }

  input ResourceInput {
    name: String
    status: STATUS
  }

  type Resource {
    name: String
    id: Int
    status: STATUS
  }

  type Person {
    age: Int
    name: String
    id: Int
    status: String
  }

  input PersonData {
    age: Int
    name: String
  }

  type Student {
    numSides: Int!
    rollOnce: Int
    info: Person
  }
  type Query {
    hello: [Int]!
    email: String
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    S1: Student
    users: [Person]
    user(id: Int, age: Int): Person
    getMsg: [String]
    getPerson(id: Int!): Person
    resource: [Resource]
  }
  type Mutation {
    addMsg(msg: String): String
    addPerson(input: PersonData): Person
    updatePerson(id: Int!, input: PersonData): Person
    addResource(input: ResourceInput): Resource
  }
`);

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return [1,2,3];
  },
  email: () => {
    return 'abc@gam'
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  S1: () => {
    return {numSides: 4, rollOnce: 5, info: {age: 7}} 
  },
  users: () => {
    return users
  },
  user: ({id, age}) => {
    return users.find(user => user.id === id)
  },
  addMsg: ({msg}) => {
    msgData.push(msg);
    return msg
  },
  getMsg: () => {
    return msgData
  },
  addPerson: ({input}) => {
    personData.push({id: personData.length + 1, name: input.name, age: input.age})
  },
  updatePerson: ({id, input}) => {
    const index = personData.findIndex(person => id === person.id);
    personData[index] = {...input, id}
  },
  getPerson: ({id}) => {
    return personData.find(person => person.id === id)
  },
  resource,
  addResource: ({input}) => {
    resource.push({id: resource.length + 1, ...input})
    return resource
  }

};

// Run the GraphQL query '{ hello }' and print out the response
// graphql({
//   schema,
//   source: '{  email }',
//   rootValue,
// }).then((response) => {
//   console.log(response);
// });


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue
}))

app.listen(5000, () => {
    console.log('Server is running');
})


// # {
// #   hello
// #   email
// #   quoteOfTheDay
// #   rollThreeDice
// #   random
// #   S1 {
// #     numSides
// #     rollOnce
// #     info {
// #       age
// #     }
// #   }
// #   users {
// #     age
// #   }
// #   user(id: 2, age: 4) {
// #     name
// #     age
// #   }
// # }

// # mutation {
// #   addMsg(msg: "hello msg3")
// # }

// # query {
// #   getMsg
// # }

// # mutation {
// #   addPerson(input: {age: 51, name: "arcdh"}) {
// #     name
// #   }
// #   updatePerson(id: 2, input: {age: 4, name: "sarda"}) {
// #     name
// #   }
// # }

// # query {
// #   getPerson(id: 2) {
// #     name
// #     age
// #   }
// # }

// # query getUserData($id: Int=1, $includeId: Boolean = false, $includeAge: Boolean = true){
// #   User: user(id:$id) {
// #     ...fields
// #   }
// #   User1: user(id:1) {
// # 		...fields
// #   }
// #   User2: user(id:2) {
// # 		...fields
// #   }
// #   q3: hello
// # }

// # fragment fields on Person {
// #   age @skip(if: $includeAge)
// #   name
// #   id @include(if: $includeId)
// # }

// {
//   resource {
//     name
// 		status    
//   }
// }

// # mutation {
// #   addResource(input: {name: "qwe", status: available}) {
// #     id
// #   }
// # }
