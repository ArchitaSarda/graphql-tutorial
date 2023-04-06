
const typeDefs = `
  type Book {
    title: String
    author: String
  }


  enum GENDER {
    male
    female
  }
  type Wand {
    wood: String!
    core: String!
    length: Float
  }
  interface Character {
    id: ID!
    name: String
    gender: GENDER
  }
  type NonHuman implements Character {
    id: ID!
    name: String
    gender: GENDER
    species: String
  }
  type Human implements Character {
    id: ID!
    name: String
    gender: GENDER
    dateOfBirth: String
    actor: String
    image: String
    wand: Wand
  }
  input HumanInput {
    name: String!
    gender: GENDER!
    dateOfBirth: String!
    actor: String!
    image: String!
  }


  type Query {
    books: [Book]
    humans: [Human!]!
    nonHumans: [NonHuman!]!
    characters: [Character!]!
    human(id: Int!): Human
  }

  type Mutation {
    addHuman(input: HumanInput): Human
  }
  
`;

module.exports = typeDefs;