const { Chars } = require("./context");

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Character: {
    __resolveType(character, context, info) {
      if (character.species) {
        return "NonHuman";
      }

      if (!character.species) {
        return "Human";
      }

      return null;
    },
  },
  Human: {
    wand(parent, _, context) {
        return context.Wands.find(wand => wand.character_id === parent.id)
    }
  },
  Wand: {
    length(parent) {
        return parent.length ?? 0;
    }
  },
  Query: {
    books: () => books,
    humans: (_, args, context) => context.Chars.filter(char => !char.species),
    nonHumans: (_, args, context) => context.Chars.filter(char => char.species),
    characters: (_, args, context) => context.Chars,
    human: (_, args, context) => {
        const {id} = args;
        return context.Chars.find(char => char.id === id)
    }
  },
  Mutation: {
    addHuman: (_, args, context) => {
        Chars.push({id: Chars.length+1, ...args.input})
        return {id: Chars.length+1, ...args.input}
    }
  }
};

module.exports = resolvers;