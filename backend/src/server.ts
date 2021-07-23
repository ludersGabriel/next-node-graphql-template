import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { context } from './context'
import path from 'path'

const main = async () => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, '/components/**/*.resolver.{ts,js}')]
  })

  const apolloServer = new ApolloServer({
    schema,
    context
  })

  apolloServer
    .listen(4000)
    .then(({ url }) => {
      console.log(`Server is running at ${url}`)
    })
}

main()
  .catch(e => {
    throw e
  })
