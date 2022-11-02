const { ApolloServer } = require('apollo-server');
const { loadFiles } = require('graphql-import-files')

const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = loadFiles('**/schema/*.graphql');

const resolvers = require('./resolvers');

const ReviewsAPI = require('./datasources/ReviewsApi');

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  dataSources: () => {
    return {
      reviewsAPI: new ReviewsAPI()
    };
  }
});

const port = 4002;
const subgraphName = 'reviews';

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });