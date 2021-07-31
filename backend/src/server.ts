import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { getUser } from '@utils/auth'
import path from 'path'

const main = async () => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, '/components/**/*.resolver.{ts,js}')]
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization || ''

      const { user } = getUser(token)

      return {
        user
      }
    }
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
