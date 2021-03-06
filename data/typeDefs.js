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
  sesso: String!
  foto: String
  telefono: String
  audio: String
  anno: Int
  luogo: String
  video: String
  note: String
  email: String
  cat: String
  madrelingua: String
  accentistranieri: Int
  accentiregionali: Int
  dubbernotes: [Dubbernote]
  dubberfiles: [Dubberfile]
  casts: [Cast]
}

input DubberInput {
  nome: String!
  cognome: String!
  sesso: String!
  foto: String
  telefono: String
  audio: String
  anno: Int
  luogo: String
  video: String
  note: String
  email: String
  cat: String
  madrelingua: String
  accentistranieri: Int
  accentiregionali: Int
}

input DubberFilter {
  deno: String
  sesso: String
  anno: Int
  cat: String
  user: Int
}

type Dubbernote {
  id: ID!
  voce: String
  ruolo: String
  etavoce: String
  cartoni: Int
  canta: Int
  piuvoci: Int
  teatro: Int
  sync: Int
  giudizio: Int
  note: String
  dubber: Dubber
  user: User
}

input DubbernoteInput {
  voce: String
  ruolo: String
  etavoce: String
  cartoni: Int
  canta: Int
  piuvoci: Int
  teatro: Int
  sync: Int
  giudizio: Int
  note: String
  id_dubber: ID!
  id_user: ID!
}

input DubbernoteFilter {
  voce: String
  ruolo: String
  etavoce: String
  cartoni: Int
  canta: Int
  piuvoci: Int
  teatro: Int
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
  descrizione: String
  user: User
  titlenotes: [Titlenote]
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
  id_user: ID
}

input TitleFilter {
  titolo: String
  anno: String
  attore: String
  tipo: String
  direttore: String
  assistente: String
  doppiatore: String
  user: Int
}

type Titlenote {
  id: ID!
  stagione: Int
  episodio: Int
  personaggio: String
  fotop: String
  attore: String
  foto: String
  descrizione: String
  doppiatore: String
  title: Title
  user: User
  dubber: Dubber
}

input TitlenoteInput {
  stagione: Int
  episodio: Int
  personaggio: String
  fotop: String
  attore: String
  doppiatore: String
  id_title: ID!
  id_user: ID!
  id_dubber: ID
}

type Cast {
  id: ID!
  title: Title
  attore: String
  foto: String
  descrizione: String
  personaggio: String
  doppiatore: String
  dubber: Dubber
}

input CastInput {
  id_title: ID!
  attore: String
  personaggio: String
  doppiatore: String
  id_dubber: ID
}

input CastFilter {
  titolo: String
  attore: String
  doppiatore: String
}

type Query {
  user(id: ID): User
  currentuser: User
  users: [User]

  dubber(id: ID): Dubber
  dubbers(where: DubberFilter, tags: DubbernoteFilter, limit: Int, order: String, offset: Int): [Dubber]

  dubbernote(id: ID): Dubbernote
  dubbernotes(id_dubber: ID, id_user: ID): [Dubbernote]

  dubberfile(id: ID): Dubberfile
  dubberfiles(id_dubber: ID, id_user: ID): [Dubberfile]

  title(id: ID): Title
  titles(where: TitleFilter, limit: Int, order: String, offset: Int): [Title]

  titlenote(id: ID): Titlenote

  cast(id: ID): Cast
  casts(where: CastFilter, limit: Int, order: String, offset: Int): [Cast]

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

  createTitlenote(input: TitlenoteInput!): Titlenote
  updateTitlenote(id: ID!, input: TitlenoteInput!): Int
  deleteTitlenote(id: ID!): Int

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
