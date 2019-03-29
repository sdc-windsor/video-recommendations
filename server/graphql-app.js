const { buildSchema } = require('graphql');

module.exports = {
  schema: buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`),
  root: {
    quoteOfTheDay: () => (Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'),
    random: () => Math.random(),
    rollThreeDice: () => [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6)),
  },
};
