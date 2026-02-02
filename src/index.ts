import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { TrackAPI } from "./datasources/track-api";

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    // WICHTIG: Port und Host für Railway konfigurieren wegen Apolloserver!!!!
    listen: {
      port: parseInt(process.env.PORT || "4000"),
      host: "0.0.0.0",
    },
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          trackAPI: new TrackAPI({ cache }),
        },
      };
    },
  });

  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
