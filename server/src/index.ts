import { ApolloServer } from "apollo-server"
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import { schema } from "./schema"
import { context } from "./context"

export const server = new ApolloServer({
  schema,
  context,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
})

const port = process.env.PORT || 4000

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
