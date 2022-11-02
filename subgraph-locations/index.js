const { ApolloServer } = require('apollo-server');
const { loadFile } = require('graphql-import-files')
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core')
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = loadFile('./schema/query.graphql');

const resolvers = require('./resolvers')

const LocationsAPI = require('./datasources/LocationsApi');

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  dataSources: () => {
    return {
      locationsAPI: new LocationsAPI()
    };
  },
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
});

const port = 4001;
const subgraphName = 'locations';

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });