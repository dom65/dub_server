const typeDefinitions = `
type User {
  id: ID!
  email: String
  token: String
  isadmin: Int
  dubbernotes: [Dubbernote]
  dubberfiles: [Dubberfile]
}

input UserInput {
  email: String
  password: String
  isadmin: Int
}

type Dubber {
  id: ID!
  nome: String!
  cognome: String!
  foto: String
  giudizio: String
  telefono: String
  audio: String
  eta: String
  video: String
  cat: String
  note: String
  dubbernotes: [Dubbernote]
  dubberfiles: [Dubberfile]
  casts: [Cast]
}

input DubberInput {
  nome: String!
  cognome: String!
  foto: String
  giudizio: String
  telefono: String
  audio: String
  eta: String
  video: String
  cat: String
  note: String
}

input DubberFilter {
  deno: String!
}

type Dubbernote {
  id: ID!
  note: String
  dubber: Dubber
  user: User
}

input DubbernoteInput {
  note: String
  id_dubber: ID!
  id_user: ID!
}

type Dubberfile {
  id: ID!
  path: String!
  type: String!
  dubber: Dubber
  user: User
}

input DubberfileInput {
  path: String!
  type: String!
  id_dubber: ID!
  id_user: ID!
}

enum TipoTitolo {
  VIDEOGAME
  FILM
  TELEFILM
  ALTRO
}

type Title {
  id: ID!
  titolo: String!
  originale: String
  tipo: TipoTitolo
  anno: String
  direttore: String
  assistente: String
  dialoghi: String
  studio: String
  poster: String
  casts: [Cast]
}

input TitleInput {
  titolo: String!
  originale: String
  tipo: String
  anno: String
  direttore: String
  assistente: String
  dialoghi: String
  studio: String
}

input TitleFilter {
  titolo: String
  anno: String
  direttore: String
  assistente: String
  doppiatore: String
}

type Cast {
  id: ID!
  title: Title
  attore: String
  personaggio: String
  dubber: Dubber
}

input CastInput {
  id_title: ID!
  attore: String
  personaggio: String
  id_dubber: ID!
}


type Query {
  user(id: ID): User
  currentuser: User
  users: [User]

  dubber(id: ID): Dubber
  dubbers(where: DubberFilter, limit: Int, order: String, offset: Int): [Dubber]

  dubbernote(id: ID): Dubbernote
  dubbernotes(id_dubber: ID, id_user: ID): [Dubbernote]

  dubberfile(id: ID): Dubberfile
  dubberfiles(id_dubber: ID, id_user: ID): [Dubberfile]

  title(id: ID): Title
  titles(where: TitleFilter, limit: Int, order: String, offset: Int): [Title]

  cast(id: ID): Cast
  casts(id_dubber: ID, id_title: ID): [Cast]
}

type Mutation {
  createUser(input: UserInput!): User
  updateUser(id: ID!, input: UserInput!): Int
  deleteUser(id: ID!): Int
  login(input: UserInput!): User

  createDubber(input: DubberInput!): Dubber
  updateDubber(id: ID!, input: DubberInput!): Int
  deleteDubber(id: ID!): Int

  createDubbernote(input: DubbernoteInput!): Dubbernote
  updateDubbernote(id: ID!, input: DubbernoteInput!): Int
  deleteDubbernote(id: ID!): Int

  createDubberfile(input: DubberfileInput): Dubberfile
  updateDubberfile(id: ID!, input: DubberfileInput!): Int
  deleteDubberfile(id: ID!): Int

  createTitle(input: TitleInput!): Title
  updateTitle(id: ID!, input: TitleInput!): Int
  deleteTitle(id: ID!): Int

  createCast(input: CastInput!): Cast
  updateCast(id: ID!, input: CastInput!): Int
  deleteCast(id: ID!): Int
}

schema {
  query: Query
  mutation: Mutation
}
`;

export default typeDefinitions;
