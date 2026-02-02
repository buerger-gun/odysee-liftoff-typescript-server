"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = (0, graphql_tag_1.default) `
  type Query {
  "query to get tracks array from the homepage grid"
    tracksForHome: [Track!]!
    }
"A track is a group of Modules that teaches about a specific topic"
type Track {
"the tracks id"
  id: ID!
  "the tracks title"
  title: String!
  "the tracks main author"
  author: Author!
  "the tracks main ullustration to display in track card or track page detail"
  thumbnail: String
  "the tracks approximate length to complete, in minutes"
  length: Int
  "the number of modules this track contains"
  modulesCount: Int
}

"Autohor of the complete Track"
  type Author {
  id: ID!
  name: String!
  photo: String
}
`;
//   type Query {
// "The SpaceCats list of all Space Cats"
// spaceCats: [SpaceCat]
//   }
// """A Space Cat character"""
//   type SpaceCat {
// id: ID!
// name: String!
// age: Int
// missions: [Mission]
//   }
// """A mission for SpaceCats"""
//   type Mission {
// id: ID!
// name: String!
// description: String!
//   }
