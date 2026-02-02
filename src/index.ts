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

    // 2. CORS Konfiguration (NEU HINZUFÜGEN)
    // Damit erlaubst du dem Client den Zugriff
    cors: {
      origin: [
        "https://odysee-liftoff-typescript-client-production.up.railway.app", // Deine Produktions-URL
        "http://localhost:3000", // Für lokale Entwicklung
        "http://localhost:5173", // Vite Standard-Port lokal
      ],
      credentials: true,
    },

    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          trackAPI: new TrackAPI({ cache }),
        },
      };
    },
  } as any);

  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
